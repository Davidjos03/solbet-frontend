interface ILanguageItem {
  name: string;
  logo: string;
}

interface IOptionList {
  name: string;
  icon: string;
}

interface IInput {
  label: string;
  type?: string;
  edit?: boolean;
  func?: string;
  state?: string;
  setState?: (data: string) => void
  disabled?: boolean;
}

interface IChatItem {
  _id: string;
  user_id: {
    _id: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface IUser {
  _id: string;
  username: string;
  address: string;
  avatar: string;
  email: string;
  refferal: string;
  inviteLink: string;
  joinTime: string;
}

interface IWalletItem {
  title: string;
  icon: string;
  subtitle: string;
  content: string;
}