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