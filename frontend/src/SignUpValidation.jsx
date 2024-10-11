function Validation (values) {
	alert = ""
	let error = {}
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/

	if (values.name === "") {
		error.name = "Name should not be empty"
	}
	else {
		error.name=""
	}
	if (values.location === "") {
		error.locaton = "Please enter location";
	  } else {
		error.location = "";
	  }

	if (values.email === "") {
		error.email = "Name should not be empty"
	}
	else if (!emailPattern.test(values.email)) {
		error.email = "Email did not match"
	} else {
		error.email = ""
	}

	if (values.password === "") {
		error.password = "Password should not be empty"
	}
	else if (!passwordPattern.test(values.password)) {
		error.password = "Password did not match"
	} else {
		error.password = ""
	}
	if (values.role === "") {
		error.role = "Please select a user type (Property Owner or Renter)";
	  } else {
		error.role = "";
	  }
	return error;
}
export default Validation;