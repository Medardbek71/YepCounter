import databaseService from "@/services/DatabaseService";

export const difference = () => {
  const TODAY = new Date().getDate();
  console.log("today =>", TODAY);
  const YESTEDAY = new Date().getDay() - 1;
  try {
    const fetchData = async () => {
      const data = await databaseService.getAllReport();
      //   const todaySpending = data.data.filter(
      //     (report: any) => report.created_at.getDate() !== TODAY
      //   );
      console.log(data.data.map((report: any) => report.created_at));
    };
    fetchData();
  } catch (error) {
    console.error(error);
  }
};
