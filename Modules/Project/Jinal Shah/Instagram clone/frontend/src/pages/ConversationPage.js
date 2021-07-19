import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import UserService from '../services/UserServices'
import { format } from "timeago.js";
import '../stylesheets/Conversation.scss'
import ScrollableFeed from 'react-scrollable-feed'
import { imgURL } from '../services/UserServices'
import { UserContext } from '../context/Context'

export default function Messanger(props) {

   //const { userID } = useContext(UserContext)
   const t1 = localStorage.getItem('token')
   //const id = userID
   const id = localStorage.getItem('user')
   const [Name, setName] = useState([])
   const [user, setUser] = useState([]);
   const [message, setMessage] = useState([]);
   const [newMessage, setNewMessage] = useState("");
   const [conID, setConID] = useState("");
   const [search, setSearch] = useState('')
   const [userDetails, setUserDetails] = useState([])
   const [show, setShow] = useState(false)
   const [toggle, setToggle] = useState(true)
   const [toggle1, setToggle1] = useState(false)
   const [groupID, setGroupID] = useState([id]);
   const [groupName, setGroupName] = useState([]);

   useEffect(() => {

      setInterval(() => {

         // get conversation 
         UserService.getConById(t1, id)
            .then(res => {
               console.log(res.data)
               setUser(res.data)
            })

      }, 100)

      // logged in user details
      UserService.getUserById(t1, id)
         .then(result => {
            setName(result.data.users[0])
         })
         .catch(err => console.log(err))

   }, [id])

   // get message of specific conversation
   const conversation = (id1) => {
      setConID(id1)
      setShow(true)
      UserService.getMessage(t1, id1)
         .then(res => {
            //console.log(res.data)
            setMessage(res.data)
         })
   }

   // insert new message
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(conID);

      const newMsg = {
         "conversationId": conID,
         "sender": id,
         "text": newMessage
      }

      UserService.addNewMessage(t1, newMsg)
         .then(res => {
            console.log(res.data);
            setMessage(res.data)
         })

      setNewMessage("")
   };

   // find user by id
   const fetchUsers = (query) => {
      setSearch(query)
      console.log(query)
      const obj1 = {
         c1: query
      }
      UserService.search(t1, obj1)
         .then(results => {
            console.log(results)
            setUserDetails(results.data.users)
         })
   }


   // insert new private conversation
   const addNew = (id2) => {
      console.log(id2);
      const obj = {
         senderId: id,
         receiverId: id2
      }

      UserService.addNewConversation(t1, obj)
         .then(res => {
            console.log(res)
            if (res.data === 'already exist') {
               window.alert('Chat already exist ')
            }
            else {
               //setUser(res.data)
            }
         })
         .catch((err) => {
            console.log(err)
         })
   }

   const addNewGroup = (id3, names) => {
      setGroupID([...groupID, id3])
      setGroupName([...groupName, names])
   }

   // insert new group conversation
   const createGroup = () => {
      UserService.addNewConGroup(t1, groupID)
         .then(res => {
            console.log(res);
         })
   }

   // delete chat
   const deleteChat = (dID) => {
      UserService.deleteChat(t1, dID)
         .then(res => {
            console.log(res.data);
         })
   }


   return (
      <div>
         <Navbar />

         <div className="container d-flex justify-content-center mb-5 " >
            <div className="d-flex flex-row justify-content-center  justify-content-between align-items-center col-10" style={{ minWidth: '400px' }}>

               <div className="col-4 border shadow border-primary  " style={{ height: '550px', minWidth: '200px' }}>

                  {/* -------- logged in user name , add new chat option -------- */}

                  <div className="row border-bottom border-primary  shadow justify-content-center ">
                     <div className="d-flex flex-row align-items-center p-2">
                        <div className="mr-0" >
                           <img className="rounded-circle border border-dark " src={`${imgURL}/${Name.profilePic}`} height="45px" width="45px" />
                        </div>
                        <span className="font-weight-bold  w-100 border-0 p-3" >
                           <div >
                              {Name.userID}
                           </div>
                        </span>
                     </div>
                     <div className="d-flex flex-row align-items-center p-2" data-toggle="tooltip" data-placement="bottom" title="New Conversation" onClick={() => {
                        setShow(false)
                        setToggle1(false)
                     }
                     }>
                        <i className="fas fa-edit" style={{ fontSize: '20px' }}></i>

                     </div>
                     <div className="d-flex flex-row align-items-center p-2" data-toggle="tooltip" data-placement="bottom" title="Group Chat" onClick={() => {
                        setShow(false)
                        setToggle1(true)
                     }
                     }>
                        <img src="../../../images/group.png" height="30px" width="30px" />
                     </div>
                  </div>

                  <div className="row mt-3 ml-1">
                     {user.map(item => {
                        return (
                           <>
                              {item.members.length == 2 ?
                                 <>
                                    {item.members.map(i1 => {
                                       return (
                                          <>

                                             {/* --------Private Conversation list -------- */}

                                             {i1._id !== id ?

                                                <div className="d-flex flex-row justify-content-center align-items-center m-2" >
                                                   <div className="mr-0" >
                                                      <img className="rounded-circle border border-dark " src={`${imgURL}/${i1.profilePic}`} height="45px" width="45px" />
                                                   </div>
                                                   <span className="font-weight-bold w-100 border-0 p-3">
                                                      <div onClick={() => conversation(item._id)}>
                                                         {i1.userID}
                                                      </div>
                                                   </span>
                                                   <a onClick={() => deleteChat(item._id)}>
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                         <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                      </svg>
                                                   </a>

                                                </div>
                                                :
                                                <div></div>
                                             }
                                          </>
                                       )
                                    })}
                                 </>
                                 :
                                 <>

                                    {/* -------- Group Conversation list -------- */}

                                    <div className="d-flex flex-row align-items-center" >

                                       <div className="mr-0" >
                                          <img className="rounded-circle border border-dark " src="../../../images/group.png" height="45px" width="45px" />
                                       </div>
                                       <span className="font-weight-bold w-100 border-0 p-3">
                                          <span className="row align-items-center">
                                             <div className="ml-3" onClick={() => conversation(item._id)}>
                                                Group Chat
                                             </div>
                                             <a className="pl-5" onClick={() => deleteChat(item._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                   <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                             </a>
                                          </span>
                                          <div className="row ml-1" style={{ fontSize: '12px' }}>
                                             {item.members.map(i1 => {
                                                return (
                                                   <div className="pr-2">
                                                      {i1.userID}
                                                   </div>)
                                             })}
                                          </div>
                                       </span>

                                    </div>

                                 </>
                              }

                           </>
                        )
                     })}
                  </div>
               </div>

               <div className="col-8 shadow border border-primary  justify-content-center align-items-center border-left-0" style={{ height: '550px', minWidth: '300px' }}>


                  {
                     message.length >= 0 && show ?
                        <>
                           <div style={{ height: '480px' }}>

                              {/* -------- Chat Messages -------- */}

                              <ScrollableFeed>
                                 {message.map(item => {
                                    return (
                                       <>

                                          {item.sender._id === id ?
                                             <div className="message own">
                                                <div className="d-flex ">
                                                   <p className="messageText mr-2">{item.text}</p>
                                                   <img className="rounded-circle border border-dark " src={`${imgURL}/${item.sender.profilePic}`} height="39px" width="39px" />
                                                </div>
                                                <div className="mx-3">{format(item.createdAt)}</div>
                                             </div>
                                             :
                                             <div className="message">
                                                <div className="d-flex ">
                                                   <img className="rounded-circle border border-dark " src={`${imgURL}/${item.sender.profilePic}`} height="39px" width="39px" />
                                                   <p className="messageText">{item.text}</p>
                                                </div>
                                                <div className="mx-3">{format(item.createdAt)}</div>
                                             </div>
                                          }
                                       </>
                                    )
                                 })}
                              </ScrollableFeed>
                           </div>

                           {/* -------- Add New Message in chat -------- */}

                           {
                              show ?
                                 <>
                                    <div className="row bg-light rounded-pill justify-content-center mb-0" style={{ height: '47px', border: '2px solid #1877f2' }}>
                                       <textarea className="col-9 pl-4 mx-2 mt-2 border border-none" placeholder="Add New Message..." value={newMessage}
                                          style={{ height: '33px', minWidth: '100px' }}
                                          onChange={(e) => setNewMessage(e.target.value)} >

                                       </textarea>

                                       <img src="images/send.png" width="45" height="43" onClick={handleSubmit} />
                                    </div>
                                 </> : <></>
                           }

                        </>
                        :
                        <>

                           {
                              toggle ?
                                 <>

                                    {/* -------- start new Conversation home page -------- */}

                                    <div className="d-flex flex-row justify-content-center pt-5 mt-5">
                                       <img src="images/chat.png" width="25%" height="25%"></img>
                                    </div>
                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                       <div className="text-muted text-center" style={{ fontSize: '30px' }}>Your Messages</div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                       <div className="text-muted font-weight-bold text-center" style={{ fontSize: '18px' }}>Send private photos and messages to a friend or group.</div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-center align-items-center text-center font-weight-bold px-3">
                                       <button className="col-5 btn btn-block btn-primary btn-lg" onClick={() => setToggle(false)} >
                                          Send Message
                                       </button>
                                    </div>
                                 </>
                                 :
                                 <>

                                    {toggle1 ?

                                       <>

                                          {/* -------- start new group Conversation -------- */}

                                          <h5 className="d-flex justify-content-center mt-3" style={{ color: '#1877f2' }}>Start Group Conversation...</h5>

                                          <div className="d-flex justify-content-center">

                                             <div className="row col-lg-8 col-sm-5 bg-light rounded-pill mt-2 mb-0" style={{ height: '47px', border: '2px solid #1877f2' }}>

                                                <form className="px-3 mt-1" >
                                                   <input type="search" className="col-lg-12 border border-none" placeholder="Search by user ID" aria-label="Search" value={search} name="search"
                                                      onChange={(e) => fetchUsers(e.target.value)} />
                                                </form>

                                             </div>

                                          </div>

                                          <div className="d-flex  justify-content-center" style={{ height: '250px' }}>
                                             {userDetails.length > 0 ?
                                                <div className="col-lg-8 col-sm-5 overflow-auto">
                                                   {userDetails.map(item => {
                                                      return (

                                                         <div className="row m-2 py-2" onClick={() => addNewGroup(item._id, item.userID)}>

                                                            {
                                                               item._id === Name._id ?
                                                                  <></> :
                                                                  <>
                                                                     <div >
                                                                        <img className="rounded-circle border border-dark mr-3" src={`${imgURL}/${item.profilePic}`} height="40px" width="40px" />
                                                                     </div>
                                                                     <div className="font-weight-bold mt-2" data-dismiss="modal" >
                                                                        {item.userID}
                                                                     </div>
                                                                  </>
                                                            }

                                                         </div>

                                                      )
                                                   })}
                                                </div>
                                                :
                                                <div></div>
                                             }

                                          </div>

                                          <div className="d-flex justify-content-center" >

                                             {groupName.length > 0 ?
                                                <div className="col-lg-8 col-sm-5 bg-light">
                                                   <>
                                                      <div className="col m-2 py-2">
                                                         <div className="row pl-3 align items center">
                                                            <div className="pr-3 font-weight-bold">
                                                               Create Group
                                                            </div>
                                                            <a onClick={createGroup}>
                                                               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                               </svg>
                                                            </a>
                                                         </div>
                                                         <div className="mr-3" >
                                                            Members You selected:
                                                            {groupName.map(key => {
                                                               return (
                                                                  <li>
                                                                     {key}
                                                                  </li>
                                                               )
                                                            })}
                                                         </div>
                                                      </div>
                                                   </>

                                                </div>

                                                :
                                                <>
                                                </>
                                             }
                                          </div>

                                       </>
                                       :
                                       <>

                                          {/* -------- start new private Conversation -------- */}

                                          <h5 className="d-flex justify-content-center mt-3" style={{ color: '#1877f2' }}>Start New Private Conversation...</h5>

                                          <div className="d-flex justify-content-center">

                                             <div className="row col-lg-8 col-sm-5 bg-light rounded-pill mt-2 mb-0" style={{ height: '47px', border: '2px solid #1877f2' }}>

                                                <form className="px-3 mt-1" >
                                                   <input type="search" className="col-lg-12 border border-none" placeholder="Search by user ID" aria-label="Search" value={search} name="search"
                                                      onChange={(e) => fetchUsers(e.target.value)} />
                                                </form>

                                             </div>

                                          </div>

                                          <div className="d-flex justify-content-center">
                                             {userDetails.length > 0 ?
                                                <div className="col-lg-8 col-sm-5 ">
                                                   {userDetails.map(item => {
                                                      return (

                                                         <div className="row m-2 py-2" onClick={() => addNew(item._id)}>

                                                            {
                                                               item._id === Name._id ?
                                                                  <></> :
                                                                  <>
                                                                     <div >
                                                                        <img className="rounded-circle border border-dark mr-3" src={`${imgURL}/${item.profilePic}`} height="40px" width="40px" />
                                                                     </div>
                                                                     <div className="font-weight-bold mt-2" data-dismiss="modal" >
                                                                        {item.userID}
                                                                     </div>
                                                                  </>
                                                            }

                                                         </div>

                                                      )
                                                   })}
                                                </div>
                                                :
                                                <div></div>
                                             }

                                          </div>

                                       </>
                                    }


                                 </>
                           }

                        </>
                  }

               </div>

            </div>

         </div >

      </div >


   )
}
