export interface UserDetails {
    fullName: string;
    email: string;
    password: string;
    phone?: Number;
    profileImage?: string;
    address?: string;
    pincode?: Number;
  }
  
  export interface UserLogin {
    email: string;
    password: string;
  }
  
  export interface dbUserData {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    phone: string | null;
    address: string | null;
    pincode: string | null;
    profileImage: string | null;
    __v: number;
  }
  
  export interface updatedUser {
    address: string;
    email: string;
    fullName: string;
    phone: number;
    pincode: number;
  }
  
  export interface passwordUpdation {
    userInput: String;
    newPassword: String;
  }
  
  // delete 
  export interface authData {
    token: String;
    userImage: String;
    role: string;
  }
  