import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import UserService from '../services/UserServices'
import '../stylesheets/Home.scss'
import { Link } from 'react-router-dom'
import { format } from "timeago.js";
import { imgURL } from '../services/UserServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { UserContext } from '../context/Context'

export default function Home(props) {

   //const { userID } = useContext(UserContext)
   const [data, setData] = useState([])
   const [Name, setName] = useState([])
   const [storyData, setStoryData] = useState([])
   const [view, setView] = useState([])
   const [comment, setComment] = useState("")

   const t1 = localStorage.getItem('token')
   //const postedBy = userID
   const postedBy = localStorage.getItem('user')

   useEffect(() => {
      UserService.getUserById(t1, postedBy)
         .then(result => {
            setName(result.data.users[0])
         })
         .catch(err => console.log(err))
   }, [postedBy])

   useEffect(() => {

      const timeout = setInterval(() => {

         UserService.allPost(t1)
            .then(res => {
               const datas = res.data.posts
               setData(datas)
            })
            .catch(err => { console.log(err) })

         UserService.allStories(t1)
            .then(res => {
               const stories = res.data.stories
               setStoryData(stories)
            })
            .catch(err => { console.log(err) })

      }, 100)

   }, [])

   const makeComment = (text, postId) => {

      const commentData = {
         postId: postId,
         text: text,
         postedBy: postedBy
      }
      const t1 = localStorage.getItem('token')

      UserService.addComment(commentData, t1)
         .then(result => {
            const newData = data.map(item => {
               if (item._id == result._id) {
                  return result
               } else {
                  return item
               }
            })
            setData(newData)
         }).catch(err => {
            console.log(err)
         })

      setComment("")

   }

   const editPost = (postid1) => {
      props.history.push(`/editpost/${postid1}`)
   }

   const deletePost = (postid) => {
      UserService.deletePost(t1, postid)
         .then(result => {
            toast(<div style={{ color: 'red' }}> Post Deleted Successfully</div>, {
               position: "top-right",
               color: 'red',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
            props.history.push('/home')
            const newData = data.filter(item => {
               return item._id !== result._id
            })
            setData(newData)

         })
   }

   const likePost = (id) => {

      const newid = {
         postId: id,
         userId: postedBy
      }
      UserService.likePost(t1, newid)
         .then(result => {
            const newData = data.map(item => {
               if (item._id == result._id) {
                  return result
               } else {
                  return item
               }
            })
            setData(newData)
         }).catch(err => {
            console.log(err)
         })
   }

   const unlikePost = (id) => {

      const newid = {
         postId: id,
         userId: postedBy
      }
      UserService.unlikePost(t1, newid)
         .then(result => {
            const newData = data.map(item => {
               if (item._id == result._id) {
                  return result
               } else {
                  return item
               }
            })
            setData(newData)
         }).catch(err => {
            console.log(err)
         })
   }

   const deleteComment = (id, id2) => {
      UserService.deleteComment(t1, id, id2)
         .then(res => {
            console.log(res);
         })
   }

   const viewStory = (objID) => {
      setView(objID)
   }

   const deleteStory = (id) => {
      UserService.deleteStory(t1, id)
         .then(res => {
            console.log(res);
            props.history.push('/home')
         })
   }

   return (

      <div>
         <Navbar />
         <ToastContainer />
         <div className="container d-flex justify-content-center" >

            {/* ------------------Post Section --------------- */}

            <div className="col-8">

               {/* ----------- Recent stories ------------ */}

               <div className="col-12">
                  <div className="d-flex flex-column">
                     <div className="d-flex flex-column">
                        <div className="card p-2 shadow bg-white rounded border border-primary" >
                           <div className="row px-3">
                              {
                                 storyData.length > 0 ?
                                    <>
                                       {
                                          storyData.map(item => {
                                             return (
                                                <>
                                                   <div className="px-2 text-center pt-2" data-toggle="modal" data-target="#exampleModalLong" onClick={() => viewStory(item._id)}>
                                                      <div >
                                                         <img className="rounded-circle"
                                                            src={`${imgURL}/${item.postedBy.profilePic}`}
                                                            height="45px" width="45px" style={{ border: '2px solid red' }} />
                                                      </div>
                                                      {item.postedBy.userID}
                                                   </div>

                                                </>
                                             )
                                          })
                                       }
                                    </>
                                    :
                                    <h3>No Recent Stories</h3>
                              }

                              <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">

                                 {storyData.map(item => {
                                    return (
                                       <>
                                          {item._id === view ?
                                             <>
                                                <div className="modal-dialog" role="document">
                                                   <div className="modal-content">
                                                      <div className="modal-header">
                                                         <h5 className="modal-title" id="exampleModalLongTitle">
                                                            {item.postedBy.userID}
                                                            <div>
                                                               {format(item.createdAt)}
                                                            </div>
                                                         </h5>
                                                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                         </button>
                                                      </div>
                                                      <div className="modal-body text-center">
                                                         <img src={`${imgURL}/${item.photo}`} alt="photo" width="350px" height="350px" />
                                                      </div>
                                                      <div className="modal-footer">
                                                         {item.postedBy._id === postedBy ?
                                                            <div className="col-sm-4 btn btn-block btn-danger rounded-pills" data-dismiss="modal" onClick={() => deleteStory(item._id)}>
                                                               Delete Story
                                                            </div>
                                                            :
                                                            <>
                                                            </>
                                                         }
                                                      </div>
                                                   </div>
                                                </div>
                                             </> :
                                             <></>}
                                       </>
                                    )
                                 })}


                              </div>

                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* ------ all posts ------ */}

               {data.length > 0 ?
                  <>
                     {data.map(item => {
                        return (
                           <div className="col-12 " key={item._id} style={{ minWidth: "300px" }}>

                              <div className="d-flex flex-column mb-4">
                                 <div className="card shadow mb-5 bg-white rounded border border-primary" >
                                    <div className="card-header bg-white">

                                       {/* --------------Title Section of post ----------- */}

                                       <div className="d-flex flex-row align-items-center">

                                          <div className="overflow-hidden d-flex justify-content-center align-items-center post-profile-photo mr-3" >

                                             <img src={`${imgURL}/${item.postedBy.profilePic}`} height="95%" width="95%" className="rounded-circle border border-dark" />
                                          </div>
                                          <span className="font-weight-bold  w-100 border-0 p-3">
                                             <div >
                                                <Link to={postedBy == item.postedBy._id ? "/profile/" : "/profile/" + item.postedBy._id} style={{ textDecoration: 'none', color: 'black' }}>
                                                   {item.postedBy.userID}
                                                </Link>
                                             </div>
                                             <div>
                                                {item.title}
                                             </div>
                                          </span>

                                          {/* ---------- Edit post --------- */}

                                          {
                                             postedBy === item.postedBy._id ?
                                                <span className="trash mr-3" onClick={() => editPost(item._id)} >
                                                   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                   </svg>
                                                </span>

                                                : <div></div>
                                          }

                                          {/* ---------- Delete post --------- */}

                                          {
                                             postedBy === item.postedBy._id ?
                                                <span className="trash" data-toggle="modal" data-target=".bd-example-modal2-sm" >
                                                   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                   </svg>
                                                </span>

                                                : <div></div>
                                          }

                                       </div>
                                    </div>


                                    <div className="modal fade bd-example-modal2-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                       <div className="modal-dialog modal-sm modal-dialog-centered">
                                          <div className="modal-content">
                                             <div className="modal-header" style={{ backgroundColor: 'skyblue' }}>
                                                <h5 className="modal-title" id="exampleModalLabel" >
                                                   Instagram post delete
                                                </h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                   <span aria-hidden="true">&times;</span>
                                                </button>
                                             </div>
                                             <div className="modal-body">
                                                Are you sure you want to delete the post ?
                                             </div>
                                             <div className="modal-footer">
                                                <div className="row">
                                                   <div className="col-sm-6">
                                                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                   </div>
                                                   <div className="col-sm-6">
                                                      <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => deletePost(item._id)}>Delete</button>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="card-body p-0">

                                       {/* ---------- Post Image --------- */}

                                       <div className="embed-responsive embed-responsive-1by1">
                                          <img src={`${imgURL}/${item.photo}`} alt="" className="embed-responsive-item" />
                                       </div>

                                       {/* ---------- Like & Comment Icon --------- */}

                                       <div className="d-flex justify-content-between ">
                                          <ul className="list-inline ml-2 mb-0">

                                             {
                                                item.likes.includes(postedBy) ?

                                                   <li className="list-inline-item mb-0">
                                                      <button className="btn" onClick={() => { unlikePost(item._id) }}>
                                                         <img src="images/unlike.jpg" height="38" width="33" />

                                                      </button>
                                                   </li>

                                                   :
                                                   <li className="list-inline-item mb-0">
                                                      <button className="btn" onClick={() => { likePost(item._id) }}>
                                                         <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" fill="black" className="bi bi-heart" viewBox="0 0 16 16">
                                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                         </svg>
                                                      </button>
                                                   </li>
                                             }

                                             <li className="list-inline-item ml-2 mb-0">
                                                <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                   <img src="images/cmnt.png" alt="imgs" height="25px" />
                                                </a>
                                             </li>
                                          </ul>
                                       </div>

                                       <div className="ml-3 mb-3 mt-0">
                                          <strong className="d-block">{item.likes.length} likes</strong>
                                          <strong>{item.postedBy.userID}</strong><span > {item.body}</span>
                                          <h6 className="d-block text-muted my-2" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                             View all {item.comments.length} comments
                                          </h6>
                                       </div>

                                       {/* ---------- Comment Section --------- */}

                                       <div className="collapse ml-3 mb-3 mt-0" id="collapseExample">

                                          {
                                             item.comments.map(record => {
                                                return (
                                                   <h6 key={record._id}>

                                                      <span>
                                                         <span className="pr-2">
                                                            <strong>{record.postedBy.userID}</strong>
                                                         </span>
                                                         {record.text}
                                                      </span>


                                                      {postedBy === item.postedBy._id ?
                                                         <>
                                                            <span className="pl-5" onClick={() => deleteComment(record._id, item._id)} >
                                                               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                               </svg>
                                                            </span>

                                                         </> :
                                                         <>
                                                            {postedBy === record.postedBy._id ?
                                                               <>
                                                                  <span className="pl-5" onClick={() => deleteComment(record._id, item._id)} >
                                                                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                     </svg>
                                                                  </span>
                                                               </>
                                                               : <></>
                                                            }
                                                         </>
                                                      }
                                                   </h6>
                                                )
                                             })
                                          }
                                       </div>

                                       {/* ---------- Add Comment --------- */}

                                       <div className="position-relative comment-box">
                                          <form onSubmit={(e) => {
                                             e.preventDefault()
                                             makeComment(e.target[0].value, item._id)

                                          }}>
                                             <input placeholder="Add a comment..." className="w-100 border-0 p-3" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                                             <button className="btn btn-rpimary position-absolute btn-post mr-3">
                                                post
                                             </button>
                                          </form>
                                       </div>

                                       {/* ---------- Post Time --------- */}

                                       <div className="text-muted m-3">
                                          {format(item.createdAt)}
                                       </div>

                                    </div>
                                 </div>
                              </div>
                           </div>
                        )
                     })}
                  </>
                  :
                  <h2>
                     No Posts
                  </h2>
               }



            </div>

            {/* ------------------Suggestion Side bar --------------- */}

            <div className="shadow mb-5 bg-white rounded border border-primary ml-0 " style={{ height: '400px', width: '350px', marginTop: '10px' }}>

               <div className="d-flex flex-column ml-3">
                  <div className="d-flex flex-row align-items-center ml-3 mt-3">
                     <div className="mr-0" >
                        <img className="rounded-circle border border-dark " src={`${imgURL}/${Name.profilePic}`} height="55px" width="55px" />
                     </div>
                     <span className="font-weight-bold  w-100 border-0 p-3">
                        <div >
                           {Name.userID}
                        </div>
                        <div>
                           {Name.userName}
                        </div>
                     </span>
                  </div>
                  <div className="d-flex flex-row align-items-center font-weight-bold text-muted ml-4 pt-3">
                     Suggesions For You
                  </div>

                  <div className="d-flex flex-row align-items-center ml-4 mt-3" style={{ fontSize: '13px' }}>
                     <div className="mr-0" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                           <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                           <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                     </div>
                     <span className="w-100 border-0 px-3 pl-3 pb-0">
                        <div className="font-weight-bold" >
                           Instagram
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0275d8" className="bi bi-patch-check-fill pl-1" viewBox="0 0 16 16">
                              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                           </svg>
                        </div>
                        <div>
                           instagram
                        </div>
                     </span>
                  </div>

                  <div className="d-flex flex-row align-items-center ml-4 mt-3" style={{ fontSize: '13px' }}>
                     <div className="mr-0" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                           <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                           <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                     </div>
                     <span className=" w-100 border-0 px-3 pl-3 pb-0">
                        <div className="font-weight-bold">
                           Cristiano
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0275d8" className="bi bi-patch-check-fill pl-1" viewBox="0 0 16 16">
                              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                           </svg>
                        </div>
                        <div>
                           Cristiano Ronaldo
                        </div>
                     </span>
                  </div>

                  <div className="d-flex flex-row align-items-center ml-4 mt-3" style={{ fontSize: '13px' }}>
                     <div className="mr-0" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                           <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                           <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                     </div>
                     <span className="  w-100 border-0 px-3 pl-3 pb-0">
                        <div className="font-weight-bold">
                           Aayushman
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0275d8" className="bi bi-patch-check-fill pl-1" viewBox="0 0 16 16">
                              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                           </svg>
                        </div>
                        <div>
                           Aayushman khurana
                        </div>
                     </span>
                  </div>

                  <div className="d-flex flex-row align-items-center ml-4 mt-3" style={{ fontSize: '13px' }}>
                     <div className="mr-0" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                           <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                           <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                     </div>
                     <span className=" w-100 border-0 px-3 pl-3 pb-0">
                        <div className="font-weight-bold">
                           instagramforbusiness
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0275d8" className="bi bi-patch-check-fill pl-1" viewBox="0 0 16 16">
                              <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                           </svg>
                        </div>
                        <div>
                           Instagram for Business
                        </div>
                     </span>
                  </div>

               </div>
            </div>
         </div>
      </div>

   )
}
