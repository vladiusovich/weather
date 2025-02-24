// import ToastNotification, {
//     ToastNotificationPropsType,
// } from '@/components/common/toastNotification/ToastNotification';
// import { useToast } from '@/components/ui/toast';
// import React from 'react';

// type NotifyType = Omit<ToastNotificationPropsType, 'id'>;

// const useToastNotification = () => {
//     const toast = useToast();

//     const notify = (notify: NotifyType) => {
//         toast.show({
//             placement: 'top',
//             duration: 2000,
//             render: ({ id }) => {
//                 const uniqueToastId = 'toast-' + id;

//                 return (
//                     <ToastNotification
//                         {...notify}
//                         variant={notify?.variant ?? 'outline'}
//                         id={uniqueToastId}
//                         title={notify.title}
//                         description={notify.description}
//                     />
//                 );
//             },
//         });
//     };

//     return {
//         notify,
//     };
// };

// export default useToastNotification;
