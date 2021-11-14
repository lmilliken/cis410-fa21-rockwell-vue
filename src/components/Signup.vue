<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="fname-input" class="form-label">First name</label
        ><input
          type="text"
          class="form-control"
          id="fname-input"
          required=""
          placeholder="First name"
          v-model="nameFirst"
        />
      </div>
      <div class="mb-3">
        <label for="lname-input" class="form-label">Last name</label
        ><input
          type="text"
          class="form-control"
          id="lname-input"
          required=""
          placeholder="Last name"
          v-model="nameLast"
        />
      </div>
      <div class="mb-3">
        <label for="email-input" class="form-label">Email</label
        ><input
          type="email"
          class="form-control"
          id="email-input"
          required=""
          placeholder="Enter email"
          v-model="email"
        />
        <small v-if="dupEmail" class="text-danger"
          >Please chose a different email</small
        >
      </div>
      <div class="mb-3">
        <label for="password-input" class="form-label">Password</label
        ><input
          type="password"
          class="form-control"
          id="password-input"
          placeholder="Password"
          required=""
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <p id="error-signup" class="text-danger">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nameFirst: "",
      nameLast: "",
      email: "",
      password: "",
      errorMessage: "",
      dupEmail: false,
    };
  },
  methods: {
    onSubmit() {
      //  console.log("form submiited");
      const myFormData = {
        nameFirst: this.nameFirst,
        nameLast: this.nameLast,
        email: this.email,
        password: this.password,
      };
      // console.log(myFormData);
      axios
        .post("/contacts", myFormData)
        .then((myResponse) => {
          console.log("the response", myResponse);
          this.$router.replace("/login?signupsuccess=true");
        })
        .catch((myError) => {
          if (myError.response.status === 409) {
            this.dupEmail = true;
          } else {
            this.errorMessage = "Cannot sign you up, please try again later";
          }
        });
    },
  },
};
</script>

<style></style>
