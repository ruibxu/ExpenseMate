import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

const Item = ({ amount, date, category }) => (
  <View style={styles.item}>
    <View style={styles.itemCategory}>
      <Text style={styles.text}>{date}</Text>
      <Text style={{ ...styles.textCategory, color: category?.color }}>{category?.label}</Text>
    </View>
    <Text style={styles.text}>${amount}</Text>
  </View>
);

const filterDataByDateRange = (data, start, end) => {
  return data.filter((item) => {
    const itemDate = moment(item.date, "DD/MM/YYYY");
    console.log("Item Date:", itemDate.format("DD/MM/YYYY"));
    console.log("Start Date:", moment(start).startOf("day").format("DD/MM/YYYY"));
    console.log("End Date:", moment(end).endOf("day").format("DD/MM/YYYY"));

    return itemDate.isBetween(moment(start).startOf("day"), moment(end).endOf("day"), null, '[]');
  });
};


const ExpenseList = ({ data }) => {
  const [selected, setSelected] = useState("last10");
  console.log(data)

  const options = [
    { _id: "1", label: "Last 10 Records", value: "last10" },
    { _id: "2", label: "Last Week", value: "lastWeek" },
    { _id: "3", label: "Last Month", value: "lastMonth" },
  ];

  const filteredData = () => {
    switch (selected) {
      case "last10":
        return data.slice(-10).reverse();
      case "lastWeek":
        return filterDataByDateRange(data, moment().subtract(1, "weeks"), moment()).reverse();
        case "lastMonth":
          const firstDayOfLastMonth = moment().subtract(1, 'months').startOf('month');
          const lastDayOfLastMonth = moment().subtract(1, 'months').endOf('month');
          return filterDataByDateRange(data, firstDayOfLastMonth, lastDayOfLastMonth).reverse();           
      default:
        return data;
    }
  };


  const formattedData = filteredData().map((item) => ({
    ...item,
    date: moment(item.date, "MM-DD-YYYY").format("MM/DD/YYYY"),
  }));
  

  return (
    <View>
      <View style={styles.containerSummary}>
        <Text style={styles.text1}>Summary</Text>
        <View>
          {Platform.OS === "ios" ? (
            <Picker
              style={{
                height: 150,
                width: 200,
                backgroundColor: "transparent",
                borderRadius: 10,
                borderColor: theme.colors.border,
                borderWidth: 1,
                marginBottom: 20,
                display: "flex",
                justifyContent: "center",
              }}
              selectedValue={selected}
              itemStyle={{
                height: 150,
                color: theme.colors.text,
              }}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                setSelected(itemValue);
              }}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option._id}
                  style={{
                    fontSize: 16,
                    color: theme.colors.text,
                  }}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          ) : (
            <Picker
              style={{
                height: 150,
                width: 200,
                backgroundColor: "transparent",
                borderRadius: 10,
                borderColor: theme.colors.border,
                borderWidth: 1,
                marginBottom: 20,
                display: "flex",
                justifyContent: "center",
                colorBackgroundFloating: theme.colors.card,
              }}
              dropdownIconColor={theme.colors.text}
              mode="dropdown"
              dropdownIconRippleColor={theme.colors.modal}
              selectedValue={selected}
              itemStyle={{
                height: 150,
                color: theme.colors.text,
              }}
              onValueChange={(itemValue, itemIndex) => {
                console.log(itemValue);
                setSelected(itemValue);
              }}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option._id}
                  style={{
                    fontSize: 16,
                    color: theme.colors.text,
                    backgroundColor: "#2d2b3b",
                    
                  }}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          )}
        </View>
      </View>
      <View>
        <View style={styles.containerCategory}>
          <Text style={styles.text}>Date</Text>
          <Text style={styles.text}>Category</Text>
          <Text style={styles.text}>Expense</Text>
        </View>
        <View style={styles.containerList}>
          {formattedData.map((item) => (
            <Item
              key={item._id}
              amount={item.amount}
              date={item.date}
              category={item.category}
            />
          ))}
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
    marginBottom: 20,
  },
  containerCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  containerSummary: {
    marginBottom: 31,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#2d2b3b",
    height: 60,
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "inset 0px 4px 4px 0px #00000040",
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
  },
  itemCategory: {
    // width: 200,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  text1: {
    fontSize: 20,
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  textCategory: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 35,
  },
});

export default ExpenseList;
