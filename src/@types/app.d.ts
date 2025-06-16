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

interface IHomeItem {
  title: string;
  content: string;
}

interface IChatItem {
  image: string;
  time: string;
  user: string;
  msg: string;
}

interface IUser {
  name: string;
  icon: string;
  email?: string;
}

interface IWalletItem {
  title: string;
  icon: string;
  subtitle: string;
  content: string;
}