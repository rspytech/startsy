class RecommendationBasic {
    stage;
    sector;
    location;
    fundingRange;
    mappings;

    constructor(_stage, _sector, _location, _fundingRange) {
        this.stage = _stage;
        this.sector = _sector;
        this.location = _location;
        this.fundingRange = _fundingRange;

        this.mappings = {
            stage: this.stage,
            sector: this.sector,
            location: this.location,
            fundingRange: this.fundingRange,
        };
    }

    recommendation_id(param) {
        let id = "";
        let recommendation_id_list = [];
        let cnt = 0;

        for (let key in param) {
            if (this.mappings[key]) {
                let value = param[key];
                id += `${this.mappings[key][value]}-` || "";
                recommendation_id_list.push(id);
            }
        }

        const editId = id.slice(0, -1);
        const lastIndex = recommendation_id_list.length - 1;
        recommendation_id_list[lastIndex] = recommendation_id_list[lastIndex].slice(0, -1);

        return recommendation_id_list.reverse();
    }
}

export default RecommendationBasic;
