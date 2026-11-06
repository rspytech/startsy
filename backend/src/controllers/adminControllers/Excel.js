import XLSX from "xlsx";
import { User } from "../../models/user.model.js";

var convertUserDataToExcel = async (req, res) => {
    try {
        var userData = await User.find({ isProfileComplete: true }).select("userName email role").populate({
            path: "roleId",
            select: "fullName",
        });

        var filterData = userData.map((e, index) => {
            return {
                "id": index + 1,
                "Username": e.userName,
                "fullName": e.roleId.fullName,
                "role": e.role,
                "email": e.email,
            };
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filterData);
        XLSX.utils.book_append_sheet(wb, ws, "Userdetails");

        const excelBuffer = XLSX.write(wb, { bookType: "csv", type: "buffer" });

        res.setHeader("Content-Disposition", 'attachment; filename="userdetails.csv"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(excelBuffer);

        // var homedir = os.homedir()
        // XLSX.writeFile(wb, `${homedir}/Downloads/userdetails.csv`);
    } catch (e) {
        console.log(e);
    }
};

export default convertUserDataToExcel;
