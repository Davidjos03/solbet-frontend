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
  disabled?: boolean;
}

interface IChatItem {
  user: string;
  content: string;
  avatar: string;
  time: string;
}

interface IUser {
  id: string;
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