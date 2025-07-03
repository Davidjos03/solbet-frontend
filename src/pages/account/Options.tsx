import { ChangeEvent, useRef, useState } from "react";
import Input from "@/components/Input";
import { Icon } from "@iconify-icon/react";
import { useUserProvider } from "@/contexts/UserContext";
import { uploadJsonToPinata } from "@/utils/utils";
import { fetchWithAuth } from "@/utils/setAuthToken";

const maxFileSize = 2 * 1024 * 1024; // 2MB
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const OptionsPage = () => {
    const { userInfo, setUserInfo } = useUserProvider();

    const [username, setUsername] = useState<string>(userInfo ? userInfo.username : "");
    const [email, setEmail] = useState<string>(userInfo ? userInfo.email : "");
    const [avatar, setAvatar] = useState<string>(userInfo ? `${userInfo.avatar}` : '/images/default-avatar.webp');
    const [error, setError] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadAvatarToBackend = async (file: File) => {
        setIsUploading(true);
        setError('');
        console.log("file => ", file);

        try {
            if (file) {
                const pinataPublicURL = "https://ipfs.io/ipfs/";
                const imageUri = await uploadJsonToPinata(file);
                if (!imageUri) {
                    throw new Error('Failed to upload image');
                }
                console.log("🚀 ~ uploadAvatarToBackend ~ imageUri:", pinataPublicURL + imageUri)

                const updateData = {
                    id: userInfo!._id,
                    avatar: pinataPublicURL + imageUri
                };
                const res = await fetchWithAuth(`/api/auth/update`, {
                    method: 'POST',
                    body: JSON.stringify(updateData)
                })
                if (res) {
                    console.log("🚀 ~ getUser ~ res:", res);
                    setUserInfo(res.user)
                    setIsUploading(false);
                }
                setAvatar(pinataPublicURL + imageUri);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Upload failed');
            setIsUploading(false); // Re-throw to handle in the calling function
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setError('');
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            setError(`Unsupported file type. Allowed types: ${allowedTypes.join(', ')}`);
            return;
        }

        // Validate file size
        if (file.size > maxFileSize) {
            setError(`File is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB`);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                setAvatar(event.target.result as string);
            }
        };
        reader.readAsDataURL(file);

        // Automatically upload to backend
        try {
            await uploadAvatarToBackend(file);
        } catch {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full sm:px-4 md:px-8 md:pt-14 opacity-100 translate-y-2 animate-fade-y">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <button
                        className={`absolute -top-1 -right-1 ${isUploading ? 'bg-[#505050]' : 'bg-[#303030]'} w-7 h-7 flex items-center justify-center rounded-full border border-[#121212] hover:bg-[#3c3c3c] transition-colors duration-300 z-[3]`}
                        onClick={triggerFileInput}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <Icon icon="svg-spinners:180-ring" width="16" height="16" style={{ color: "#A2A2A2" }} />
                        ) : (
                            <Icon icon="fluent:edit-16-filled" width="16" height="16" style={{ color: "#A2A2A2" }} />
                        )}
                    </button>
                    <div className="rounded-[20px] overflow-hidden border-[1px] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[100px] h-[100px] border-[#222222] bg-[#303045] p-[1px] border-none">
                        <div className="w-full h-full p-0.5 border-[1px] border-[#222222] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A] rounded-[22px]">
                            <div className="w-full h-full border-[1px] border-[#222222] rounded-[20px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                <img
                                    src={avatar}
                                    alt="User avatar"
                                    className={`object-cover object-center w-full h-full rounded-[20px] ${isUploading ? 'opacity-70' : ''}`}
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept={allowedTypes.join(',')}
                                    style={{ display: 'none' }}
                                    disabled={isUploading}
                                />
                                {isUploading && (
                                    <div className="absolute top-0 w-full h-full flex items-center justify-center">
                                        <Icon
                                            icon="eos-icons:three-dots-loading"
                                            width="24"
                                            height="24"
                                            style={{ color: "#FFFFFF" }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="text-[20px] font-semibold leading-[28px] max-w-[200px] truncate">{userInfo!.username}</h4>
                        <div className="p-[1px] rounded-md overflow-hidden bg-[#616161] text-[#D2D2D2]">
                            <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">1</div>
                        </div>
                    </div>
                    <p className="text-[#A2A2A2] text-sm mt-1">{new Date(userInfo!.created_at).toISOString().split('T')[0]}</p>
                </div>
            </div>
            <Input label="Enter name" edit={true} state={username} setState={setUsername} />
            <Input label="Enter email" edit={true} func="verify" state={email} setState={setEmail} />
            <Input label="Client Seed" type="password" edit={true} func="show" />
            <Input label="Connect Account" disabled={true} />
            <Input label="Referred by" state={userInfo!.inviteLink} disabled={true} />
        </div>
    );
};

export default OptionsPage;