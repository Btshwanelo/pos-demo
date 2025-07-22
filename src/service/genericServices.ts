import { apiSlice } from '../slices/apiSlice';

export const genericSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ConfirmOTPReq: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    ResendOTPReq: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    AuthenticateUser: builder.mutation({
      query: ({ body }) => ({
        url: `/auth/external-logon`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    RetrieveCurrentUser: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    GetApplicationListing: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    ResetPasswordReq: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    GetLoanOffer: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
    ActionLoanOffer: builder.mutation({
      query: ({ body }) => ({
        url: `/entities/ExecuteRequest?RequestName=${body.requestName}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useConfirmOTPReqMutation,
  useActionLoanOfferMutation,
  useGetLoanOfferMutation,
  useAuthenticateUserMutation,
  useResetPasswordReqMutation,
  useResendOTPReqMutation,
  useRetrieveCurrentUserMutation,
  useGetApplicationListingMutation,
} = genericSlice;
