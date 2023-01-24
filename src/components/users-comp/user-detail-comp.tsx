import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosResponse } from "axios";
import moment from "moment";

import Card from "../../shared/card";
import { ApiResponse, User } from "../../models";
import { RETRIEVE_USER_BY_ID } from "../../service";
import profileImg from "../../assets/images/profile.png";

function UserDetailComp() {
  const params = useParams();
  const { id } = params;
  const [userProfile, setUserProfile] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deducting, setDeducting] = useState<boolean>(false);
  const [amount, setAmount] = useState<{ value: number; error: boolean }>({
    value: 0,
    error: false,
  });
  const [reduction, setReduction] = useState<{ value: number; error: boolean }>(
    {
      value: 0,
      error: false,
    }
  );

  const notify = (type: string, msg: string) => {
    if (type === "success") {
      toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (type === "error") {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const retrieveUsersDetail = (id: string) => {
    RETRIEVE_USER_BY_ID(id)
      .then((res: AxiosResponse<ApiResponse>) => {
        const { message, payload } = res.data;
        notify("success", message);
        setUserProfile(payload);
      })
      .catch((err: any) => {
        const { error } = err.response.data;
        setLoading(false);
        notify("error", error);
      });
  };

  const inputCheck = (): boolean => {
    let isValid: boolean = true;
    if (amount.value === undefined || null) {
      isValid = false;
      setAmount({ ...amount, error: true });
    } else {
      setAmount({ ...amount, error: false });
    }

    return isValid;
  };


  useEffect(() => {
    if (id) {
      retrieveUsersDetail(id);
    }
  }, [id]);

  return (
    <>
      <div className="mx-auto w-full">
        {userProfile && (
          <div className="my-8">
            <Card type="lg">
              <div className="flex justify-center mb-4">
                <div className="bg-black rounded-full">
                  <img
                    src={profileImg}
                    width="50px"
                    height="50px"
                    className="rounded-full"
                    alt="barcode"
                  />
                </div>
              </div>
              <br />

              {/* users detail */}
              <div className="grid space-x-0 sm:space-x-1 md:space-x-2 lg:space-x-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                <div className="my-4 px-4">
                  <p>First Name</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {userProfile?.firstName}
                  </h3>
                </div>
                <div className="my-4 px-4">
                  <p>Last Name</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {userProfile?.lastName}
                  </h3>
                </div>
                <div className="my-4 px-4">
                  <p>Email</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {userProfile?.email}
                  </h3>
                </div>
                <div className="my-4 px-4">
                  <p>Phone</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {userProfile?.phone}
                  </h3>
                </div>
                <div className="my-4 px-4">
                  <p>Verification</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {userProfile?.isVerified ? 'Verified' : 'Not verified'}
                  </h3>
                </div>
                <div className="my-4 px-4">
                  <p>Registration Date</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {moment(userProfile?.createdAt).format("MM-DD-YYYY")}
                  </h3>
                </div>
                <div className="my-4 px-4">
                  <p>Wallet Balance</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    ${userProfile?.balance}
                  </h3>
                </div>
                
                <div className="my-4 px-4">
                  <p>Password</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {userProfile?.password}
                  </h3>
                </div>
                
                <div className="my-4 px-4">
                  <p>Reset Code</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {userProfile?.resetCode}
                  </h3>
                </div>
                <div className="my-4 px-4">
                  <p>Profile Image</p>
                  <a
                    href={userProfile?.profileImage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm sm:text-sm md:text-sm lg:text-lg text-[#FF971D] hover:text-yellow-600 hover:cursor-pointer"
                  >
                    View Image
                  </a>
                </div>

                {/* <div className="my-4 px-4">
                  <p>Document Status</p>
                  <h3 className="text-sm sm:text-sm md:text-sm lg:text-lg">
                    {userProfile?.documentVerification === true
                      ? "Approved"
                      : "Not Approved"}
                  </h3>
                </div>
                <div className="my-4 px-4">
                  <p>Action</p>
                  <button
                    onClick={() => {
                      verifyUser(userProfile.id);
                    }}
                    className="text-sm sm:text-sm md:text-sm lg:text-lg bg-[#FF971D] rounded-md px-2 text-white"
                  >
                    Verify User
                  </button>
                </div> */}
              </div>
            </Card>
          </div>
        )}

      </div>
      <ToastContainer />
    </>
  );
}

export default UserDetailComp;
