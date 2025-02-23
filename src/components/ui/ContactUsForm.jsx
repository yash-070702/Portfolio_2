import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/CountryCode"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"
import toast from "react-hot-toast";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false);
      toast.success("Query Send Successfully");
    } 
     catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false);
     
   }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-7  md:border-2  md:!p-7 rounded-xl !mb-10 lg:!mx-auto !mx-2"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:!flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
      className="w-full outline-none rounded-[0.5rem] bg-[#161d29] !p-[12px] text-[#f1f2ff]"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="w-full outline-none rounded-[0.5rem] bg-[#161d29] !p-[12px] text-[#f1f2ff]"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
       className="w-full outline-none rounded-[0.5rem] bg-[#161d29] !p-[12px] text-[#f1f2ff]"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="!-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
          
           
              placeholder="Enter first name"
          className="w-full outline-none rounded-[0.5rem] bg-[#161d29] !p-[12px] text-[#f1f2ff]"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code}  - {ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="tel"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
            className="w-full outline-none rounded-[0.5rem] bg-[#161d29] !p-[12px] text-[#f1f2ff]"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="!-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="w-full outline-none rounded-[0.5rem] bg-[#161d29] !p-[12px] text-[#f1f2ff]"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="!-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-gradient-to-r from-[#65a8f6] to-[#338af2]  !px-6 !py-3 text-center text-[13px] font-bold text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-[#585d69] sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm
 