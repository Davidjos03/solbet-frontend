import { useState } from "react";
import Input from "@/components/Input";
import { Icon } from "@iconify-icon/react";
import { useUserProvider } from "@/contexts/UserContext";

const OptionsPage = () => {
    const { userInfo } = useUserProvider();

    const [username, setUsername] = useState<string>(userInfo ? userInfo.username : "");
    const [email, setEmail] = useState<string>(userInfo ? userInfo.email : "");


    return (
        <div className="w-full sm:px-4 md:px-8 md:pt-14 opacity-100 translate-y-2 animate-fade-y">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <button className="absolute -top-1 -right-1 bg-[#303030] w-7 h-7 flex items-center justify-center rounded-full border border-[#121212] hover:bg-[#3c3c3c] transition-colors duration-300 z-[3]">
                        <Icon icon="fluent:edit-16-filled" width="16" height="16" style={{ color: "#A2A2A2" }} />
                    </button>
                    <div className="rounded-[20px] overflow-hidden border-[1px] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[100px] h-[100px] border-[#222222] bg-[#303045] p-[1px] border-none">
                        <div className="w-full h-full p-0.5 border-[1px] border-[#222222] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A] rounded-[22px]">
                            <div className="w-full h-full border-[1px] border-[#222222] rounded-[20px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                <img src={`/images/avatars/${userInfo!.avatar}`} alt="no avatar" className="object-cover object-center w-full h-full rounded-[20px]" />
                            </div>
                        </div>
                    </div>
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