import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from "react"
import {get, post, put, doDelete, setHeader} from "./services/index"

function App() {
  const [loginData, setLoginData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [userCreate, setUserCreate] = useState([]);
  const [userDelete, setUserDelete] = useState([]);
  const [userEdit, setUserEdit] = useState([]);
  const [user, setUser] = useState([]);

  function login() {
    var body = {
      grant_type: 'password',
      client_id:'99e3d1c3-be63-4575-b462-374ff8c3fde1',
      client_secret:'Oh1ammtQHpvtN0B8NBTgIyVQ53QRd1g0ZyLViwQJ',
      username:'test@example.com',
      password:''
    }

    post('http://127.0.0.1:8000/oauth/token', body).then((response) => {
      setLoginData(response.data)
      setHeader(response.data.token_type, response.data.access_token)
    });
  }

  function getUsers() {
    get('http://127.0.0.1:8000/api/users').then((response) => setUsersData(response.data));
  }

  function getUser() {
    get('http://127.0.0.1:8000/api/user').then((response) => setUser(response.data));
  }

  function createUser(){
    var body = {
      email: 'test2@example.com',
      name: 'teste',
      password:'123456789'
    }

    post('http://127.0.0.1:8000/api/user', body).then((response) => {
      setUserCreate(response.data)
    });
  }

  function deleteUser() {
    doDelete('http://127.0.0.1:8000/api/user/3').then((response) => setUserDelete(response.data));
  }

  function editUser(){
    var body = {
      email: 'usuario@editado.com',
      name: 'teste',
      password:'123456789'
    }

    put('http://127.0.0.1:8000/api/user/3', body).then((response) => {
      setUserEdit(response.data)
    });
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ width:"500px",display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <button onClick={login}>Login</button>
          <button onClick={getUsers}>User List</button>
          <button onClick={createUser}>Add User</button>
          <button onClick={editUser}>Edit User</button>
          <button onClick={deleteUser}>Delete User</button>
          <button onClick={getUser}>Me</button>
        </div>
        <div style={{ width:"700px",display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <label style={loginData.token_type ? {backgroundColor: 'green' } : {backgroundColor: 'red' }}>Login</label>
        <label style={usersData.length > 0 ? {backgroundColor: 'green' } : {backgroundColor: 'red' }}>User List</label>
        <label style={userCreate.id? {backgroundColor: 'green' } : {backgroundColor: 'red' }}>Add User</label>
        <label style={userDelete.id ? {backgroundColor: 'green' } : {backgroundColor: 'red' }}>Delete User</label>
        <label style={userEdit.id ? {backgroundColor: 'green' } : {backgroundColor: 'red' }}>Edit User</label>
        <label style={user.id ? {backgroundColor: 'green' } : {backgroundColor: 'red' }}>Me</label>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
