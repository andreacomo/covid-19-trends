export class DistrictsLockdownColors {

    source: string;

    lastUpdate: string;

    data: Regulation[];
}

export class Regulation {

    issueDate: string;

    validFromDate: string;

    scenarios: Scenario[];
}

export class Scenario {

    color: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

    scenario: 1 | 2 | 3 | 4;

    districts: string[];
}
