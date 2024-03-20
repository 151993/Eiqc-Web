export interface LoadingState {
  show: boolean; // Show or hide loading page
  message: LoadingMessage; // The message to display. Refer to LoadingMessage
  icon: LoadingIcon; // Select the loading icon or use default. Refer to LoadingIcon
  static: boolean; // Always show loading. Only use this if you don't want the user to do any action. Like after they have logged out.
  fullPage: boolean; // Show UI blocking loader or a small loader on header nav.
}

export enum LoadingMessage {
  Loading = 'Message.Loading',
  RetrievingData = 'Message.RetrievingData',
  SavingChanges = 'Message.SavingChanges',
  LoggedOutLogIn = 'Message.LoggedOutLogIn'
}

export enum LoadingIcon {
  Default = 'ball-clip-rotate',
  Fussion = 'ball-fussion',
  Timer = 'timer',
  Blank = ''
}

export enum LoaderName {
  GlobalLoading = 'globalLoading',
  SearchCarLoading = 'searchCarLoading',
  DepartmentLoading = 'departmentLoading'
}
