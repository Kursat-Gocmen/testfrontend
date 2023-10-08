import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button} from '@mui/material';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [student, setStudents] = useState([]);


  const handleClick=(e)=>{e.preventDefault()
  const student={name,address}
  console.log(student)
  fetch("http://localhost:8080/student/add", { 
    method:"Post",
    headers:{"Content-Type":"application/json"}, 
    body:JSON.stringify(student)
    }).then(()=>{
    console.log("New Student added")
    })
  }

  useEffect(()=>{  
    fetch("http://localhost:8080/student/getAll")
    .then(res=>res.json())
    .then((result)=>{
    setStudents(result);})
},[])

  return (
    <form noValidate autoComplete="off">
      <Container>
        <Paper elevation={3} sx={paperStyle}>
          <h1 style={{ color: 'blue' }}><u>Add Student</u></h1>

          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />  
        </Paper>
      </Container>
      <Button variant="contained" onClick={handleClick}>Submit</Button>

      <Paper elevation={3} sx={paperStyle}>
      {student.map(student=>( 
        <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
        Id= {student.id} ,
        Name = {student.name} ,
        Address: {student.address} 
      </Paper> 
    ))
    }
      </Paper>
    </form>
  );
}
