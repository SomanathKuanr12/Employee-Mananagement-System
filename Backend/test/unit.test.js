

const supertest = require('supertest');
const app=require('../app')

 const ava=require('ava');
 const { default: test } = require('ava');


//  describe('Admin Api Test',()=>{
//     it('admin should successfully login',async()=>{
//         const body={
//             email:"som1@hotmail.com",
//             password:"12345"
//         }
//         const response=await supertest(app).post('/admin/log_in').send(body);
        
//         expect(response.status).toBe(200); 
//         expect(typeof response.body).toEqual('object');
//     })
  //   it('should handle  login with invalid password',async()=>{
  //       const body={
  //           email:"som1@hotmail.com",
  //           password:"1234544"
  //       }
  //       const response=await supertest(app).post('/admin/log_in').send(body);
        
  //       expect(response.status).toBe(401); 
  //       expect(response.body).toEqual({message:'Password does not match'});
  //       expect(response.body).toMatchSnapshot();
  //     })
  //   it('should handle  login with uregistered id',async()=>{
  //       const body={
  //           email:"s@hotmail.com",
  //           password:"1234"
  //       }
  //       const response=await supertest(app).post('/admin/log_in').send(body);
  //       expect(response.body).toMatchSnapshot();
  //       //expect(response.status).toBe(403); 
  //       //expect(response.body).toEqual({message:'Unregistered user'});
  //   })
  // })





// describe('adminChange Api Test',()=>{
// //     it('admin successfully change password',async()=>{
// //         const body={
// //             oldPassword:"12345",
// //             newPassword:"1234",
// //             email:"som1@hotmail.com",
            
// //         }
// //         const response=await supertest(app).put('/admin/change').send(body);        
// //         expect(response.status).toEqual(200); 
// //         expect(response.body).toEqual({message:'Password updated successfully'});
// //     }),
//     it('should handle invalid oldPassword',async()=>{
//         const body={
//             oldPassword:"12356",
//             newPassword:"12345",
//             email:"som1@hotmail.com",
            
//         }
//         const response=await supertest(app).put('/admin/change').send(body);
        
//         expect(response.status).toEqual(401); 
//         expect(response.body).toEqual({message:'old Password does not match'});
//     }),
//     it('should handle  new and old Password are same',async()=>{
//         const body={
//             oldPassword:"1234",
//             newPassword:"1234",
//             email:"som1@hotmail.com",
            
//         }
//         const response=await supertest(app).put('/admin/change').send(body);
        
//         expect(response.status).toBe(405); 
//         expect(response.body).toEqual({message:'old password and new password are same'});
//     }),
//     it('should handle email does not exist',async()=>{
//         const body={
//             oldPassword:"12356",
//             newPassword:"1234",
//             email:"so@hotmail.com",
            
//         }
//         const response=await supertest(app).put('/admin/change').send(body);
        
//         expect(response.status).toBe(403); 
//         expect(response.body).toEqual({message: 'email id does not exist'});
//     }),
//     it('should handle  empty new password',async()=>{
//         const body={
//             oldPassword:"12356",
//             newPassword:"",
//             email:"so@hotmail.com",
            
//         }
//         const response=await supertest(app).put('/admin/change').send(body);
        
//         expect(response.status).toBe(406); 
//         expect(response.body).toEqual({message:'new password field is empty'});
//     })
// })

/////////////////password reset test/////////
// describe('sendOtp Api test', () =>{ 
//     const body = {
//       email: "somanathkuanr56@gmail.com"
//     };
//     it('should be otp sent successfully', async () => {
//       const response = await supertest(app).post(`/otp`).send(body);
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual(true);
//     });
//   });
  
  
//   describe('verifyOtp Api test',()=>{  
//     it('should successfully verify otp',async ()=>{
//             const otp=335075
//              const email="somanathkuanr56@gmail.com"
//            const response=await supertest(app).get(`/otp/${otp}/${email}`);
//            expect(response.body).toEqual(true)
            
//           }),
//     it('should handle invalid otp',async ()=>{
//         const otp=434364
//       const email="somanathkuanr56@gmail.com"
//       const response=await supertest(app).get(`/otp/${otp}/${email}`);
//       expect(response.status).toBe(405);
//       expect(response.body).toEqual({message:'otp does not match'});
      
//     })

//    }); 
  
// describe('passwordReset API test',()=>{
//     it('should reset password successfully',async ()=>{
//         const body={
//             password:"1234",
//             email:"somanathkuanr56@gmail.com"
//         };
//         const response=await supertest(app).put('/otp').send(body);
//          expect(response.status).toEqual(200)
//          expect(response.body).toEqual({message: 'Password updated successfully'})
//     });
    
//     it('should handle empty password ',async ()=>{
//         const body={
//             password:"",
//             email:"somanathkuanr56@gmail.com"
//         }
//         const response=await supertest(app).put('/otp').send(body);
//         expect(response.status).toEqual(406)
//         expect(response.body).toEqual({message: 'Password should not be empty'});
//     })
//  })
  
////////////////////////////////////crud test///////////
  
//   describe('getAllData Api test',()=>{
//     it('should fetch data',async ()=>{
//       const response=await supertest(app).get('/service1/get') ;
//       expect(typeof response.body).toBe('object')
//       expect(response.body.length).toBeGreaterThan(0); 
//     });
//   })


//   describe('getDataById API test', () => {
//     it('should fetch data by valid id', async () => {
//       const id=20;
//         const response = await supertest(app).get(`/service1/get/${id}`);
//         expect(typeof response.body).toBe('object');
//     });
//     it('should handle fetching data by invalid id', async () => {
//         const id = 99919; 
//         const response = await supertest(app).get(`/service1/get/${id}`);
//         expect(response.status).toEqual(405); 
//         expect(response.body).toEqual({message:'id does not exist'});
//     })
//   })
 
  
  // describe('insertData Api test',()=>{
  //   it('data inserted',async ()=>{
  //     const body={
  //       id: 39,
  //       name: 'ssds',
  //       city: 'zz',
  //       email: '',
  //       salary: '421900'
  //     }
  //     const response=await supertest(app).post('/service1/insert').send(body);
      
  //     expect(response.body).toEqual({message:'successfully Inserted'});
  //     expect(response.status).toEqual(200);
  //   }),
  //   it('should handle insufficient data',async ()=>{
  //     const body={
  //       id: 39,
  //       name: 'ssds',
  //       city: '',
  //       email: 'dss@gmail.com',
  //       salary: '421900'
  //     }
  //     const response=await supertest(app).post('/service1/insert').send(body);
  //     expect(response.status).toEqual(408);
  //     expect(response.body).toEqual({message:'Insufficient data'});
  //   })
  // })
  
  
  
  
  
  
//   describe('updateApi test',()=>{
//     it('data should successfully updated',async ()=>{
//       const id=39
//       const body={
//         id: 39,
//         name: 'ssads',
//         city: 'zz',
//         email: 's2s@gmail.com',
//         salary: '421900'
//       }
//       const response=await supertest(app).put(`/service1/update/${id}`).send(body);
//       expect(response.status).toEqual(200);
//       expect(response.body).toEqual({message:'successfully Updated'});
//     }),
//     it('should handle invalid id',async ()=>{
//       const id=395
//       const body={
//         id: 395,
//         name: 'ssads',
//         city: 'zz',
//         email: 's2s@gmail.com',
//         salary: '421900'
//       }
//       const response=await supertest(app).put(`/service1/update/${id}`).send(body);
//       expect(response.status).toEqual(405);
//       expect(response.body).toEqual({message:'id does not exist'});
//     }),
//     it('should handle insufficent data',async ()=>{
//       const id=20
//       const body={
//         id: 20,
//         name: '',
//         city: 'zz',
//         email: 's2s@gmail.com',
//         salary: '421900'
//       }
//       const response=await supertest(app).put(`/service1/update/${id}`).send(body);
//       expect(response.status).toEqual(408);
//       expect(response.body).toEqual({message:'Insufficient data'});
//     })
//   })
  
  
  
//   describe('DeleteAPI test',()=>{
//     it(' data deleted by id',async ()=>{
//       const id=39
//       const response=await supertest(app).delete(`/service1/delete/${id}`);
//         expect(typeof response.body).toBe('object')
      
//     }),
//     it(' data deleted by invalid id',async ()=>{
//       const id=2121;
//       const response=await supertest(app).delete(`/service1/delete/${id}`);
//       expect(response.status).toBe(405)
//       expect(response.body).toEqual({message:'id does not exist'})
//     })
//   })




/////////////////////////////////////AVA test///////////////////////////////////////////////////////////////////////////////////////


// test('should get all data', async  t=> {    
//     const response = await supertest(app).get('/service1/get');
//     t.is(response.status,200);
//    t.is(typeof response.body,'object');
// });


// test('should handle data for invalid id', async t => {
// const id = 2121;
// const response = await supertest(app).delete(`/service1/delete/${id}`);
// t.is(response.status, 405);
// t.deepEqual(response.body, { message: 'id does not exist' });

// });



test.before('should data successfully inserted',async t=>{
        const body={
          id: 138,
          name: 'ssds',
          city: 'zz',
          email: 'ss@gmail.com',
          salary: '421900'
        }
        try{
        const response=await supertest(app).post('/service1/insert').send(body);
        t.deepEqual(response.body,{message:'successfully Inserted'});
        t.is(response.status,200);
        }
        catch(error){
            t.fail(`Request failed with error: ${error.message}`);
        }
      })

     

      test('should fetch data by valid id', async t => {
      const id=138;
      try{
        const response = await supertest(app).get(`/service1/get/${id}`);
        t.deepEqual(typeof response.body,'object');
        t.truthy(response.body[0].id)
       
      }
      catch(error)
      {
        t.fail(`Request failed with error: ${error.message}`);
      }
    });
   

        test('should handle insufficient data',async t=>{
      const body={
        id: 138,
        name: 'ssds',
        city: '',
        email: 'dss@gmail.com',
        salary: '421900'
      }
      try{
      const response=await supertest(app).post('/service1/insert').send(body);
      t.deepEqual(response.body,{message:'Insufficient data'});
      t.is(response.status,408);
      }
      catch(error)
      {
        t.fail(`Request failed with error: ${error.message}`);
      }
    })

test('should successfully update data ',async t=>{
const id=138
  const body={
    name: 'ssads',
    city: 'zz',
    email: 'y@gmail.com',
    salary: '421900'
  }
  try{
    const response=await supertest(app).put(`/service1/update/${id}`).send(body);
    t.deepEqual(response.body,{message:'successfully Updated'});
    t.is(response.status,200);
    
  }
  catch(error)
  {
    t.fail(`Request failed with error: ${error.message}`);
  }
  })

  test.after.always(' data deleted by id',async t=>{
    const id=138
    try{
    const response=await supertest(app).delete(`/service1/delete/${id}`);
     t.deepEqual(typeof response.body,'object');
    }
    catch(error)
    {
      t.fail(`Request failed with error: ${error.message}`);
    }
    
  })



//   test('send otp with invalid email', async t => {
//     const body={
//       email:"somanathkuan@gmail.com"
//     }
//     try{
//        const response = await supertest(app).post(`/otp`).send(body);
//        t.deepEqual(response.body,{message:'Employee  does not exist'});
//        t.is(response.status,409);
//     }
//     catch(error)
//     {
//       t.fail(`Request failed with error: ${error.message}`);
//     }
//   });

  
      
      
    
    //   test('should successfully send otp', async t => {
    //     const body={
    //      email:"somanathkuanr56@gmail.com"
    //     }
    //     try{
    //     const response = await supertest(app).post(`/otp`).send(body)
    //     t.deepEqual(response.body.isSent,true);
    //     t.is(response.status,200);
    //     }
    //     catch(error)
    //         {
    //           t.fail(`Request failed with error: ${error.message}`);
    //         }
        
    //   });
    
    
    
     
    //   test('should handle  invalid otp',async t=>{
    //     const otp=4343
    //     const email="y@gmail.com"
    //     const response=await supertest(app).get(`/otp/${otp}/${email}`)
    //     t.is(response.status,405);
    //     t.deepEqual(response.body,{message:'otp does not match'});
        
    //   })
  
    
    
      
    //   test.serial('should successfully verify otp',async t=>{
    //     const otp=212132
    //     console.log("otp is "+otp);
    //     const email='ss@gmail.com'
    //     try{
    //     const response=await supertest(app).get(`/otp/${otp}/${email}`);
    //     t.deepEqual(response.body,true);
    //     }
    //     catch(error)
    //     {
    //       t.fail(`Request failed with error: ${error.message}`);
    //     }   
    //   })
        // test.serial('should reset password successfully',async t=>{
        //         const body={
        //             password:"1234",
        //             email:"ss@gmail.com"
        //         };
        //         try{
        //         const response=await supertest(app).put('/otp').send(body);
        //          t.deepEqual(response.body,{message: 'Password updated successfully'})
        //          t.is(response.status,200)
        //         }catch(error)
        //         {
        //           t.fail(`Request failed with error: ${error.message}`);
        //         }
        //     });
            
        //     test('should handle empty password ',async t=>{
        //         const body={
        //             password:"",
        //             email:"y@gmail.com"
        //         }
        //         const response=await supertest(app).put('/otp').send(body);
        //         t.is(response.status,406)
        //         t.deepEqual(response.body,{message: 'Password should not be empty'});
        //     })



 
    // test('admin should successfully login',async t=>{
    //     const body={
    //         email:"som1@hotmail.com",
    //         password:"12345"
    //     }
    //     try{
    //     const response=await supertest(app).post('/admin/log_in').send(body);       
    //     t.is(response.status,200); 
    //     t.deepEqual(typeof response.body,'object');
    //     }
    //     catch(error)
    //     {
    //        t.fail(`Request failed with error: ${error.message}`);
    //     }
    // })
    // test('should handle  login with invalid password',async t=>{
    //     const body={
    //         email:"som1@hotmail.com",
    //         password:"1234544"
    //     }
    //     try{
    //     const response=await supertest(app).post('/admin/log_in').send(body);
        
    //     t.deepEqual(response.status,401); 
    //     t.deepEqual(response.body,{message:'Password does not match'});
    //     }
    //     catch(error)
    //     {
    //          t.fail(`Request failed with error: ${error.message}`);
    //     }
    // })
    // test('should handle  login with uregistered id',async t=>{
    //     const body={
    //         email:"s@hotmail.com",
    //         password:"1234"
    //     }
    //     try{
    //     const response=await supertest(app).post('/admin/log_in').send(body);
    //     // t.is(response.status,403); 
    //     // t.deepEqual(response.body,{message:'Unregistered user'});
    //     t.snapshot(response.body);
    //     }
    //     catch(error)
    //     {
    //         t.fail(`Request failed with error: ${error.message}`);
    //     }
    // })

    
//     it('admin successfully change password',async()=>{
//         const body={
//             oldPassword:"12345",
//             newPassword:"1234",
//             email:"som1@hotmail.com",
            
//         }
//         const response=await supertest(app).put('/admin/change').send(body);        
//         expect(response.status).toEqual(200); 
//         expect(response.body).toEqual({message:'Password updated successfully'});
//     }),



    // test('should handle invalid oldPassword',async t=>{
    //     const body={
    //         oldPassword:"12356",
    //         newPassword:"12345",
    //         email:"som1@hotmail.com",
            
    //     }
    //     try{
    //     const response=await supertest(app).put('/admin/change').send(body);
        
    //     t.is(response.status,401); 
    //     t.deepEqual(response.body,{message:'old Password does not match'});
    //     }
    //     catch(error)
    //     {
    //       t.fail(`Request failed with error: ${error.message}`);
    //     }
    // }),
    // test('should handle  new and old Password are same',async t=>{
    //     const body={
    //         oldPassword:"1234",
    //         newPassword:"1234",
    //         email:"som1@hotmail.com",
            
    //     }
    //     try{
    //     const response=await supertest(app).put('/admin/change').send(body);
    //     t.is(response.status,405); 
    //     t.deepEqual(response.body,{message:'old password and new password are same'});
    //     }
    //     catch(error)
    //     {
    //       t.fail(`Request failed with error: ${error.message}`);
    //     }
    // }),
    // test('should handle email does not exist',async t=>{
    //     const body={
    //         oldPassword:"12356",
    //         newPassword:"1234",
    //         email:"so@hotmail.com",
            
    //     }
    //     const response=await supertest(app).put('/admin/change').send(body);
    //     t.is(response.status,403); 
    //     t.deepEqual(response.body,{message: 'email id does not exist'});
    // }),
    // test('should handle  empty new password',async t=>{
    //     const body={
    //         oldPassword:"12356",
    //         newPassword:"",
    //         email:"so@hotmail.com",   
    //     }
    //     try{
    //     const response=await supertest(app).put('/admin/change').send(body);
    //     t.is(response.status,406); 
    //     t.deepEqual(response.body,{message:'new password field is empty'});
    //     }
    //     catch(error)
    //     {
    //       t.fail(`Request failed with error: ${error.message}`);
    //     }
    // })







  

