export class VaccinesDeliveryDatesPerSupplier {

    supplier: string;

    deliveries: SupplierDelivery[];
}

export class SupplierDelivery {

    date: string;

    doses: number;
}
