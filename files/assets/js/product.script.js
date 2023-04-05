$(document).ready(function(){

  $.ajax({
    url:'http://localhost:3000/api/product/findAll',
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){
    // console.log(">>", response);
    let data = response.data;
    let status = response.status
    
    if (status) { 
        createTbody(data);
        console.log("pass")
    } else {
        alert(false,'Πρόβλημα στην αναζήτηση των προϊόντων ('+ data.message + ')');
        // console.log(data);
    }
  });

  // $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

  //   let username = $("#username").val();
  //   let password = $("#password").val();
  //   let name = $("#name").val();
  //   let surname = $("#surname").val();
  //   let email = $("#email").val();
  //   let area =  $("#area").val();
  //   let road =  $("#road").val();

  //   const item = {
  //     'username': username,
  //     'password': password,
  //     'name': name,
  //     'surname': surname,
  //     'email': email,
  //     'address': {
  //       'area': area,
  //       'road': road
  //     }
  //   }

  //   // console.log($('.btnSubmit').val(), item);
  //   $.ajax({
  //     url: "http://localhost:3000/api/user/create",
  //     type: "post",
  //     data: item,
  //     dataType: "JSON",
  //     // encode: true,
  //   })
  //   .done( function(response) {
  //     // console.log(">>", response);
      
  //     let data = response.data;
  //     let status = response.status
  
  //     if (status) { 
  //         console.log(true,'Επιτυχής εισαγωγή του χρήστη');
  //         alert(true,'Επιτυχής εισαγωγή του χρήστη');
  //         $('#frmUser')[0].reset();
  //     } else {
  //         console.log(false,'Πρόβλημα στην εισαγωγή του χρήστη ('+ data.message + ')');
  //         alert(false,'Πρόβλημα στην εισαγωγή του χρήστη ('+ data.message + ')');
  //         $('#frmUser')[0].reset();
  //         // console.log(data.message);
  //     }
  //   });

  //   return false
  // });

});

function createTbody(data){

  $("#productTable > tbody").empty();

  // console.log("CreateTBody", data);
  const len = data.length;
  for (let i=0; i<len; i++){
    let product = data[i].product;
    let description = data[i].description;
    let cost = data[i].cost;
    let quantity = data[i].quantity;
    
    console.log(product)
    
    // console.log(username, name);

    let tr_str = "<tr>" +
      "<td>" + product + "</td>" +
      "<td>" + description + "</td>" +
      "<td>" + cost + "</td>" +
      "<td>" + quantity + "</td>" +
      "<td>" +
          "<button class='btnUpdate btn btn-primary' value=\'"+product+"\'>Τροποποίηση</button> " +
          "<button class='btnDelete btn btn-primary' value=\'"+product+"\'>Διαγραφή</button>" +
      "</td>" + 
      "</tr>";

    $("#productTable tbody").append(tr_str);
  }
}

// function alert(status, message){
//   if (status){
//       $('.alert').addClass('alert-success');
//       $('.alert').removeClass('alert-danger');
//   } else {
//       $('.alert').addClass('alert-danger');
//       $('.alert').removeClass('alert-success');
//   }
//   $('.alert').html(message);
// }