// import { Toast, ToastTitle, ToastDescription } from '@/components/ui/toast';
// import React from 'react';

// export type VariantType = 'outline' | 'solid' | undefined;
// export type ToastNotificationActionType =
//     | 'success'
//     | 'info'
//     | 'error'
//     | 'warning'
//     | 'muted'
//     | undefined;

// export interface ToastNotificationPropsType {
//     id: string;
//     title: string;
//     description: string;
//     action?: ToastNotificationActionType;
//     variant?: VariantType;
// }

// const ToastNotification: React.FC<ToastNotificationPropsType> = ({
//     id,
//     title,
//     description,
//     ...props
// }) => {
//     return (
//         <Toast nativeID={id} {...props}>
//             <ToastTitle>{title}</ToastTitle>
//             <ToastDescription>{description}</ToastDescription>
//         </Toast>
//     );
// };

// export default ToastNotification;
