import React, { useState, useContext } from 'react'
import '../stylesheets/Navbar.scss'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import UserServices from '../services/UserServices';
import { imgURL } from '../services/UserServices'
import { UserContext } from '../context/Context'

export default function Navbar(props) {

   const history = useHistory();
   const [search, setSearch] = useState('')
   const [userDetails, setUserDetails] = useState([])

   const t1 = localStorage.getItem('token')
   const { userID } = useContext(UserContext)
   const t2 = userID

   const logout = () => {
      localStorage.clear()
      window.alert('You are logged out!!')
      history.push('/')
   }

   const chat = () => {
      history.push('/chats')
   }

   const fetchUsers = (query) => {
      setSearch(query)
      const obj1 = {
         c1: query
      }
      UserServices.search(t1, obj1)
         .then(results => {
            setUserDetails(results.data.users)
         })
   }

   const handleLink = (ida) => {
      setSearch('')
      if (t2 === ida) {
         history.push('profile')
      }
      else {
         history.push(`/profile/${ida}`)
      }
   }

   return (
      <div>
         <nav className="navbar navbar-expand-lg navbar-white bg-white shadow border border-primary mb-4 bg-white rounded" >
            <div className="container justify-content-center">
               <div className="d-flex flex-row justify-content-between align-items-center col-11">

                  <a href="#" className="navbar-brand">
                     <img src="../../images/baw.png" alt="instagram" style={{ width: "130px", height: "40px" }} loading="lazy" />
                  </a>

                  <div>
                     <form className="form-inline my-2 my-lg-0 d-none d-sm-block ">
                        <input type="search" className=" form-control mr-sm-2  text-center" placeholder="search" aria-label="Search" style={{ width: "200px" }} data-toggle="modal" data-target=".bd-example-modal-sm" />
                     </form>
                  </div>

                  <div className="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                     <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                           <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Find Your Friend</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                              </button>
                           </div>
                           <div className="modal-body">
                              <form className=" px-3">
                                 <div className="text-center p-2"> Search by user ID </div>
                                 <input type="search" className="form-control" placeholder="search" aria-label="Search" value={search} name="search"
                                    onChange={(e) => fetchUsers(e.target.value)} />
                              </form>
                              <div className="ml-3">
                                 {userDetails ?
                                    <div>
                                       {userDetails.map(item => {
                                          return (
                                             <div className="row m-2">
                                                <div >
                                                   <img className="rounded-circle border border-dark mr-3" src={`${imgURL}/${item.profilePic}`} height="40px" width="40px" />
                                                </div>
                                                <div className="font-weight-bold mt-2" data-dismiss="modal" onClick={() => handleLink(item._id)}>
                                                   {item.userID}
                                                </div>

                                             </div>

                                          )
                                       })}
                                    </div>
                                    :
                                    <div>Loading..</div>
                                 }
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div>
                     <ul className="list-inline m-0">
                        <li className="list-inline-item " data-toggle="tooltip" data-placement="bottom" title="Home Page">
                           <Link to="/home">
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                 <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                              </svg>
                           </Link>
                        </li>

                        <li className="list-inline-item ml-2" >
                           <div className="dropdown">
                              <Link to="/createpost" >
                                 <a style={{ textDecoration: "none", color: 'black' }}>
                                    <img src="../../images/add.png" width="25" height="25"></img>
                                 </a>
                              </Link>
                              <div className="dropdown-content text-center">
                                 <Link to="/createpost" >
                                    Add New Post
                                 </Link>
                                 <Link to="/createstory" >
                                    Add New Story
                                 </Link>
                              </div>
                           </div>
                        </li>

                        <li className="list-inline-item ml-2" >
                           <a onClick={chat} style={{ textDecoration: "none", color: 'black' }}>
                              <img src="../../images/chat.png" width="22" height="22"></img>
                           </a>
                        </li>

                        <li className="list-inline-item ml-2" data-toggle="tooltip" data-placement="bottom" title="Profile">
                           <Link to="/profile" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" className="bi bi-person-circle" viewBox="0 0 16 16">
                                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                 <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                              </svg>
                           </Link>
                        </li>
                        <li className="list-inline-item ml-2" data-toggle="tooltip" data-placement="bottom" title="Log Out">
                           <a onClick={logout} style={{ textDecoration: "none", color: 'black' }}>
                              <img src="../../images/logout.png" width="20" height="20"></img>
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </nav>
      </div >
   )
}