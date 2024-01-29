import moment from "moment";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Item = ({ amount, date }) => (
  <View style={styles.item}>
    <Text style={styles.text}>${amount}</Text>
    <Text style={styles.text}>{date}</Text>
  </View>
);

const ExpenseList = ({ data }) => {
  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

  const formattedData = sortedData.map(item => ({
    ...item,
    date: moment(item.date).format('DD.MM.YYYY'),
  }));

  const firstTenElements = formattedData.slice(0, 10);

  console.log(firstTenElements)

  return (
    <View>
      <View style={styles.containerSummary}>
        <Text style={styles.text1}>Summary</Text>
        <View></View>
      </View>
      <View>
        <View style={styles.containerCategory}>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}>Category</Text>
          <Text style={styles.text}>Expense</Text>
        </View>
        <View style={styles.containerList}>
          <FlatList
            data={firstTenElements}
            renderItem={({ item }) => (
              <Item amount={item.amount} date={item.date} />
            )}
            style={{
              width: "100%"
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerList: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  containerCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  containerSummary: {
    marginBottom: 31
  },
  item: {
    backgroundColor: "#2d2b3b",
    height: "50px",
    width: "100%",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "inset 0px 4px 4px 0px #00000040",
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF"
  },
  text1: {
    fontSize: 20,
    color: "#FFFFFF",
    textTransform: "uppercase"
  }
});

export default ExpenseList;
