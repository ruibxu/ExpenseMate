import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

const Item = ({ amount, date, category }) => (
  <View style={styles.item}>
    <View style={styles.itemCategory}>
      <Text style={styles.text}>{date}</Text>
      <Text style={styles.textCategory}>{category.label}</Text>
    </View>
    <Text style={styles.text}>${amount}</Text>
  </View>
);

const ExpenseList = ({ data }) => {
  const [selected, setSelected] = useState("last10");

  const options = [
    {
      _id: "1",
      label: "Last 10 Record",
      value: "last10",
    },
    {
      _id: "2",
      label: "Last Week",
      value: "lastWeek",
    },
    {
      _id: "3",
      label: "Last Month",
      value: "lastMonth",
    },
  ];

  const filteredData = () => {
    switch (selected) {
      case "last10":
        return data.slice(0, 10);
      case "lastWeek":
        // Filtrar por los gastos de la última semana
        const lastWeekData = data.filter(
          (item) =>
            moment(item.date).isAfter(
              moment().subtract(1, "weeks").startOf("day")
            ) && moment(item.date).isBefore(moment().endOf("day"))
        );
        return lastWeekData;
      case "lastMonth":
        // Filtrar por los gastos del último mes
        const lastMonthData = data.filter(
          (item) =>
            moment(item.date).isAfter(
              moment().subtract(1, "months").startOf("day")
            ) && moment(item.date).isBefore(moment().endOf("day"))
        );
        return lastMonthData;
      default:
        return data;
    }
  };

  const sortedData = filteredData().sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formattedData = sortedData.map((item) => ({
    ...item,
    date: moment(item.date).format("DD.MM.YYYY"),
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
              amount={item.amount}
              date={item.date}
              category={item.category}
              key={item.id}
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
