const conf = {
    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCEApiKey : String(import.meta.env.VITE_TINY_MCE_API_KEY),
}

export default conf