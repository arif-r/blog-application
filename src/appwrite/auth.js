import { Client, Account, ID } from "appwrite";
import conf from '../conf';



export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) return this.loginUser({email, password});
            else userAccount;
            
        } catch (error) {
            console.log("Error : ./appwrite/auth.js :: error while creating user account :" + error);
            return false
        }
    }

    async loginUser({email, password}) {
        try {
            const loginSession = await this.account.createEmailPasswordSession(email, password);
            if(loginSession){
                console.log(email + " : has successfully logged In.")
                return true
            } else {
                console.log(email + " : login failed.")
                return true;
            }
        } catch (error) {
            console.log("Error : ./appwrite/auth.js :: error while login user :" + error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("User is Not logged In.")
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error :: User logout failed.")
        }
    }
}

const authService = new AuthService();

export default authService;
