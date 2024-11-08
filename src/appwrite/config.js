
import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from '../conf';

export class Service{
    client = new Client();
    database;
    bucket;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteDatabaseId)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            const document = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return document;
        } catch (error) {
            console.log("Error :: ./appwrite/config.js : create post method failed : " + error )
            return false
        }
    }

    async updatePost(slug , {title, content, featuredImage, status}) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("Error :: ./appwrite/config.js : update post method failed : " + error )
            return false
        }
    }

    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Error :: ./appwrite/config.js :delete post method failed : " + error )
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Error :: ./appwrite/config.js : get post method failed : " + error )
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Error :: ./appwrite/config.js :get posts method failed : " + error )
            return false
        }
    }

    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(), 
                file
            );
            return true
        } catch (error) {
            console.log("Error :: ./appwrite/config.js : upload file method failed : " + error )
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Error :: ./appwrite/config.js : upload file method failed : " + error )
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            );
        } catch (error) {
            console.log("Error :: ./appwrite/config.js : file preview method failed : " + error )
            return false
        }
    }

}

const service = new Service();

export default service

