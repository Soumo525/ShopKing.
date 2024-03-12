import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react';
import { account, database, storage } from '../../appwrite/appwrite';
import { useNavigate } from 'react-router';
import conf from '../../conf/conf';
import { ID, Query } from 'appwrite';

const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {
    const [loading, setLoading] = useState(); 
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        checkUser()
    
    }, [])

    const adminLogin = async (adminInfo) => {
        try {
            let response = await account.createEmailSession(
                adminInfo.email,
                adminInfo.password
            )
            let accountDet = await account.get()
            setUser(accountDet)
            navigate("/admin/control");
        } catch (error) {
            console.error(error);
        }
    }
    const checkUser = async () => {
        try {
          let check = await account.get()
          setUser(check)
        } catch (error) {
          //console.error(error);
        } finally {
          setLoading(false)
        }
      }
      const adminLogout = async () => {
        try {
          await account.deleteSession('current');
          setUser(null);
          navigate("/");
        } catch (error) {
          //console.error("Error logging out:", error);
        }
      };

      const addToDatabse = async({title,content,category,subcategory,price,imagekey}) => {
        try {
            const userId = user.$id;
            const data = {
                title,content,category,subcategory,price,userId,imagekey
            }
            const  newData = await database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
                ID.unique(),
                data
            )

        } catch (error) {
            console.error(error);
        }

      }
      const uploadImage = async(file) => {
        setLoading(true);
        try {
            const response = await storage.createFile(
                conf.appwriteBucketId_1,
                ID.unique(),
                file
            );
            setLoading(false)
            return response.$id;
        } catch (error) {
            console.error(error);
        }
      }

    const  [post,setPost] = useState([])
    const getpost = async(queries = [Query.equal("category", ["Mobile"])]) => {
        try {
            const data = await database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
                queries
            )
            setPost(data.documents)
            //console.log(data.documents);
        } catch (error) {
            console.error(error);
        }
    }


    const [image, setImage] = useState([])
    const imageList = async() => {
   try {
    const img = await storage.listFiles(
        conf.appwriteBucketId_1
    )
    setImage(img.files)
    //console.log(img.files);
   } catch (error) {
    console.error(error);
   }
    }

    const [postTshirt, setpostTshirt] = useState([]) 
    const getTshirt = async(queries = [Query.equal("category", ["Tshirt"])]) => {
        try {
            const data = await database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
                queries
            )
            setpostTshirt(data.documents)
            //console.log(data.documents);
        } catch (error) {
            console.error(error);
        }
    }

    const [gift, setGift] = useState([])
    const getGift = async(queries = [Query.equal("category", ["Gift"])]) => {
        try {
            const data = await database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1,
                queries
            )
            setGift(data.documents)
            //console.log(data.documents);
        } catch (error) {
            console.error(error);
        }
    }

    // Coupon  Code Functions
    const  [ couponold, setCoupon ] = useState([])
    const getCoupon = async() => {
        try {
            const newDatacop = await database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_2,
               
            )
            setCoupon(newDatacop.documents)
            
        } catch (error) {
            console.error(error);
        }
    } 

   
    const updateCoupon = async(id,{couponCodeAll}) =>{
     try {
        
        const existing = await database.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId_2,
            id
        );
        const update = {
            couponCodeAll : couponCodeAll || existing.existing
        };

        const updatedata = await database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId_2,
            //
            id,
            update
        )

     } catch (error) {
        console.error(error);
     }
    }
   

    

    const uploadShipp = async({name,phone,email,add,state,pin,title,quantity,Document_ID,total,status,id,transaction,date,ssKey

    
    }) => {
        try {

            const data = {
                name,phone,email,add,state,pin,title,quantity,Document_ID,total,status,id,transaction,date,ssKey

            }
            const newData = await database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_3,
                ID.unique(),
                data 
                )

        } catch (error) {
            
        }
    }

    const [shipping, setShipping] = useState([])

    const getShipping = async() => {
        try {
            const ship = await database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_3
            )
            setShipping(ship.documents)
            //console.log(setShipping(ship.documents));
        } catch (error) {
            console.error(error);
        }
    }

    // update payment 

    const updatepay = async(updateId, { status }) => {
        try {
            const existing = await database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_3,
                //
                updateId
            );

            const update = {
                status : status || existing.existing
            };
            const updatedata = await database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_3,
                //
                updateId,
                update
            )

        } catch (error) {
            console.error(error);
        }
    }


    /// Get all data from data base  and render it to the page
    const [allData, setAllData] = useState()
    const getAllData = async() =>{
        try {
            const allData = await database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId_1
            )
            setAllData(allData.documents)
        } catch (error) {
            console.error(error);
        }
    }
    // Delete Data 

    const  deleteOneItem = async (itemID)=>{
        try {
           await database.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId_1,
             itemID
           )
        } catch (error) {
            console.error(error);
        }
    }
 
    const data = {
        user,
        adminLogin,
        adminLogout,
        addToDatabse,
        uploadImage,
        getpost,
        post,
        image,
        imageList,
        getTshirt,
        postTshirt,
        getGift,
        gift,
        updateCoupon,
        getCoupon,
        couponold,
        uploadShipp,
        getShipping,
        shipping,
        updatepay,
        getAllData,
        allData,
        deleteOneItem
    };
    return (
        <AuthContext.Provider value={data}>
            {loading ? <p>Loading...</p> :  children}
        </AuthContext.Provider>
    );
};

export const  useAuth = () => {
    return useContext(AuthContext);
};
export default AuthContext;
