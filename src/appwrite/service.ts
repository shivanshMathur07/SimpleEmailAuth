import {ID,Account,Client} from 'appwrite';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';

const client = new Client();

const APPWRITE_ENDPOINT:string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECTID:string = Config.APPWRITE_PROJECTID!;

type CreateEmailAccount = {
    email:string;
    password:string;
    name:string;
}

type LoginEmailAccount = {
    email:string;
    password:string;
}

export default class AppWriteService{
    account;

    constructor(){
        client.setEndpoint(APPWRITE_ENDPOINT);
        client.setProject(APPWRITE_PROJECTID);

        this.account = new Account(client);
    }

    //create user account with email & password
    async createEmailAccount({email,password,name}:CreateEmailAccount){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if(userAccount){
               //TODO: Have to create login from here
               return this.loginEmailAccount({email,password}); 
            }else{
                return userAccount;
            }
        } catch (error) {
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log(`Appwrite Error createEmailAccount :: ${error}`);
            
        }
    }

    //login user with email & password
    async loginEmailAccount ({email,password}:LoginEmailAccount){
        try {
            return await this.account.createEmailSession(
                email,
                password
            );
        } catch (error) {
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log(`Appwrite Error loginEmailAccount :: ${error}`); 
        }
    }

    // get the logged in user currently
    async getCurrentUser (){
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log(`Appwrite Error getCurrentUser :: ${error}`);
        }
    }

    // logout the current user
    async logoutCurrentUser(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            Snackbar.show({
                text:String(error),
                duration:Snackbar.LENGTH_LONG
            })
            console.log(`Appwrite Error logoutCurrentUser :: ${error}`);
        }
    }
}

