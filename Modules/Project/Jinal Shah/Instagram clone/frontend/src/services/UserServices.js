import axios from 'axios';

//const USER_API_BASE_URL = "http://20.198.103.48:1015/instagram";
//export const imgURL = "http://20.198.103.48:1015/uploads";

const USER_API_BASE_URL = "http://localhost:80/instagram";
export const imgURL = "http://localhost:80/uploads";

const token = localStorage.getItem('token')

class UserService {

   login(logindata) {
      return axios.post(USER_API_BASE_URL + '/login', logindata)
   }

   home() {
      return axios.get(USER_API_BASE_URL + '/userAccounts', {
         headers: {
            token: `${token}`
         }
      })
   }

   createAccount(userdata) {
      return axios.post(USER_API_BASE_URL + '/userAccounts/signup', userdata)
   }

   verify(otp) {
      return axios.get(USER_API_BASE_URL + '/userAccounts/signup/verify/' + otp)
   }

   addPost(postdata, token1) {
      return axios.post(USER_API_BASE_URL + '/userPost/createpost', postdata, {
         headers: {
            token: `${token1}`
         }
      })
   }

   addStory(storydata, t1) {
      return axios.post(USER_API_BASE_URL + '/userStory/createstory', storydata, {
         headers: {
            token: `${t1}`
         }
      })
   }

   follow(t1, obj1) {
      return axios.put(USER_API_BASE_URL + '/userAccounts/follow', obj1, {
         headers: {
            token: `${t1}`
         }
      })
   }

   unfollow(t1, obj1) {
      return axios.put(USER_API_BASE_URL + '/userAccounts/unfollow', obj1, {
         headers: {
            token: `${t1}`
         }
      })
   }

   allPost(t1) {
      return axios.get(USER_API_BASE_URL + '/userPost', {
         headers: {
            token: `${t1}`
         }
      })
   }

   allStories(t1) {
      return axios.get(USER_API_BASE_URL + '/userStory', {
         headers: {
            token: `${t1}`
         }
      })
   }

   deleteStory(t1, id) {
      return axios.delete(USER_API_BASE_URL + `/userStory/${id}`, {
         headers: {
            token: `${t1}`
         }
      })
   }

   mypost(t1, postedBy) {
      return axios.get(USER_API_BASE_URL + `/userPost/mypost/${postedBy}`, {
         headers: {
            token: `${t1}`
         }
      })
   }

   editPost(t1, id) {
      return axios.put(USER_API_BASE_URL + '/userPost/' + id, {
         headers: {
            token: `${t1}`
         }
      })
   }

   getPostById(t1, id) {
      return axios.get(USER_API_BASE_URL + '/userPost/' + id, {
         headers: {
            token: `${t1}`
         }
      })
   }

   getUserById(t1, id) {
      return axios.get(USER_API_BASE_URL + '/userAccounts/' + id, {
         headers: {
            token: `${t1}`
         }
      })
   }

   getDetails(t1, id) {
      return axios.get(USER_API_BASE_URL + '/userAccounts/details/' + id, {
         headers: {
            token: `${t1}`
         }
      })
   }

   updatePost(t1, id, updatedData) {
      console.log(id)
      return axios.put(USER_API_BASE_URL + `/userPost/${id}`, updatedData, {
         headers: {
            token: `${t1}`
         }
      })
   }

   deletePost(t1, id) {
      return axios({
         method: 'DELETE',
         //url: `http://20.198.103.48:1015/instagram/userPost/${id}`,
         url: `${USER_API_BASE_URL}/userPost/${id}`,
         headers: {
            token: `${t1}`
         }
      })
   }

   updateProfilePic(t1, obj1) {
      return axios.put(USER_API_BASE_URL + '/userAccounts/updateprofilepic', obj1, {
         headers: {
            token: `${t1}`
         }
      })
   }

   addComment(commentData, t1) {
      return axios.put(USER_API_BASE_URL + '/userPost/addcomment', commentData, {
         headers: {
            token: `${t1}`
         }
      })
   }

   likePost(t1, newid) {
      return axios.put(USER_API_BASE_URL + '/userPost/like', newid, {
         headers: {
            token: `${t1}`
         }
      })
   }

   unlikePost(t1, newid) {
      return axios.put(USER_API_BASE_URL + '/userPost/unlike', newid, {
         headers: {
            token: `${t1}`
         }
      })
   }

   search(t1, query) {
      return axios.post(USER_API_BASE_URL + '/userAccounts/searchusers', query, {
         headers: {
            token: `${t1}`
         }
      })
   }

   getConById(t1, id) {
      return axios.get(USER_API_BASE_URL + `/conversation/${id}`, {
         headers: {
            token: `${t1}`
         }
      })
   }

   getMessage(t1, id) {
      return axios.get(USER_API_BASE_URL + `/message/${id}`, {
         headers: {
            token: `${t1}`
         }
      })
   }

   addNewMessage(t1, obj) {
      return axios.post(USER_API_BASE_URL + '/message', obj, {
         headers: {
            token: `${t1}`
         }
      })
   }

   addNewConversation(t1, obj) {
      return axios.post(USER_API_BASE_URL + '/conversation', obj, {
         headers: {
            token: `${t1}`
         }
      })
   }

   addNewConGroup(t1, members) {
      return axios.post(USER_API_BASE_URL + '/conversation/group', members, {
         headers: {
            token: `${t1}`
         }
      })
   }

   deleteChat(t1, id) {
      return axios.delete(USER_API_BASE_URL + `/conversation/${id}`, {
         headers: {
            token: `${t1}`
         }
      })
   }

   deleteComment(t1, id, postedBy) {
      return axios({
         method: 'DELETE',
         //url: `http://20.198.103.48:1015/instagram/userPost/comment/${id}`,
         url: `${USER_API_BASE_URL}/userPost/comment/${id}`,
         data: {
            postedBy
         },
         headers: {
            token: `${t1}`
         }
      })
   }

}

export default new UserService()