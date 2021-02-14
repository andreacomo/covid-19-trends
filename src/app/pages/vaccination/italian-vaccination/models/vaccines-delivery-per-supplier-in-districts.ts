export class VaccinesDeliveryPerSupplierInDistricts {

    supplier: string;

    deliveries: DistrictDelivery[];
}

export class DistrictDelivery {

    districtName: string;

    doses: number;
}
