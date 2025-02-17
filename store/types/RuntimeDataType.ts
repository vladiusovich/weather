import OrdersStatus from "@type/orders/OrdersStatus";

export interface RuntimeDataType {
    ordersStatus?: OrdersStatus;
    executionTime?: number;
}