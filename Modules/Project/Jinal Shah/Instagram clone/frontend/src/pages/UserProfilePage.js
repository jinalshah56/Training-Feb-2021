import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import UserService from '../services/UserServices'
import { imgURL } from '../services/UserServices'
import { UserContext } from '../context/Context'

export default function UserProfile(props) {

   const id = props.match.params.id
   const t1 = localStorage.getItem('token')
   //const { userID } = useContext(UserContext)
   //const t2 = userID
   const t2 = localStorage.getItem('user')

   const [data, setData] = useState([])
   const [userProfile, setProfile] = useState('')

   const [following, setFolllowing] = useState([])
   const [followers, setFolllowers] = useState([])

   const [details, setDetails] = useState([])

   useEffect(() => {

      UserService.getUserById(t1, id)
         .then(result => {
            setProfile(result.data.users[0])
            setFolllowing(result.data.users[0].following)
            setFolllowers(result.data.users[0].followers)
         })
         .catch(err => console.log(err))

      UserService.mypost(t1, id)
         .then(result => {
            //console.log(result)
            setData(result.data.mypost)
         })
         .catch(err => console.log(err))

      UserService.getDetails(t1, id)
         .then(result => {
            //console.log(result.data.users[0])
            setDetails(result.data.users[0].followers)
         })
         .catch(err => console.log(err))

   })


   const followUser = () => {

      const obj1 = {
         id,
         user: t2
      }
      UserService.follow(t1, obj1)
         .then(res => {
            //console.log(res)
         })
         .catch(err => console.log(err))

   }

   const unfollowUser = () => {
      const obj1 = {
         id,
         user: t2
      }
      UserService.unfollow(t1, obj1)
         .then(res => {
            //console.log(res)
         })
         .catch(err => console.log(err))

   }


   return (

      <div>
         <Navbar />

         <div className="container justify-content-center mt-5">
            <div className="col-9 justify-content-between align-items-center my-0 mx-auto " >

               <div className="mx-0 my-3 " style={{ borderBottom: "1px solid grey" }}>
                  <div className="d-flex my-3 justify-content-around " >
                     <div >
                        <div>
                           <img style={{ width: "140px", height: "140px", borderRadius: "80px" }}
                              src={`${imgURL}/${userProfile.profilePic}`} />
                        </div>

                     </div>
                     <div className=" ml-2 mt-2">
                        <h4>{userProfile.userID}</h4>
                        <h5>{userProfile.userName}</h5>
                        <h5>{userProfile.email}</h5>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>

                           <h6>{data.length} posts</h6>
                           <h6>{followers.length} followers</h6>
                           <h6>{following.length} following</h6>
                        </div>

                        {details.includes(t2) ?
                           <>
                              <button className="btn btn-block btn-primary" onClick={() => unfollowUser()}  >
                                 UnFollow
                              </button>
                           </>
                           :
                           <>
                              <button className="btn btn-block btn-primary" onClick={() => followUser()}  >
                                 Follow
                              </button>
                           </>
                        }

                     </div>
                  </div>
               </div>
            </div>

            {/* <div className="col-12 justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>

               {data.map(item => {
                  return (
                     <img key={item._id} className="p-3" src={item.photo} alt={item.title} />
                  )
               })
               }

            </div> */}


            <div className="container d-flex justify-content-center mb-5" >
               <div className=" justify-content-between align-items-center my-0 mx-auto">
                  <div className="row">
                     {data.length > 0 ?
                        data.map(item => {
                           return (
                              <div className="col-lg-4 col-md-6 col-sm-12 h-50 py-3" style={{ minWidth: '18rem', minHeight: '18rem' }}>
                                 <img className="w-100" src={`${imgURL}/${item.photo}`} alt={item.title} style={{ height: '300px' }} />
                              </div>
                           )
                        })

                        :
                        <div className="col-12 justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                           <h1>No posts yet</h1>
                        </div>
                     }
                  </div>
               </div>
            </div>

         </div>

      </div>


   )
}
