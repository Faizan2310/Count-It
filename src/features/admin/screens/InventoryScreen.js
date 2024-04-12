import React from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable, List } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

const InventoryItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
export const InventoryScreen = ({ navigation }) => {
  return (
    <SafeArea style={{ backgroundColor: "aliceblue" }}>
      <List.Section
        style={{ alignItems: "center", backgroundColor: "aliceblue" }}
      >
        <Spacer size="medium" />
        <Text variant="heading2">Statistics</Text>
      </List.Section>
      <ScrollView>
        <List.Section>
          <Text variant="heading2">Total Products</Text>
          <Text variant="heading2">Stock in Hand</Text>
        </List.Section>

        <List.Section>
          <DataTable style={{ flex: 1, padding: 15, elevation: 5 }}>
            <DataTable.Header style={{ backgroundColor: "#DCDCDC" }}>
              <DataTable.Title>Name</DataTable.Title>

              <DataTable.Title>Quantity</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Medicines</DataTable.Cell>

              <DataTable.Cell>23</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Chairs</DataTable.Cell>

              <DataTable.Cell>26</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Polyfax</DataTable.Cell>

              <DataTable.Cell>20</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Athromycin</DataTable.Cell>

              <DataTable.Cell>24</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Athromycin</DataTable.Cell>

              <DataTable.Cell>24</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Athromycin</DataTable.Cell>

              <DataTable.Cell>24</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Athromycin</DataTable.Cell>

              <DataTable.Cell>24</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Athromycin</DataTable.Cell>

              <DataTable.Cell>24</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Athromycin</DataTable.Cell>

              <DataTable.Cell>24</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </List.Section>
        <List.Section>
          <InventoryItem
            title="Edit"
            left={(props) => (
              <List.Icon {...props} color="black" icon="pencil" />
            )}
            description="Tap here to edit the values."
          />

          <InventoryItem
            title="View Results"
            left={(props) => (
              <List.Icon {...props} color="black" icon="folder" />
            )}
            description="Tap here to view recent calculated results."
          />
          <InventoryItem
            title="Delete"
            left={(props) => (
              <List.Icon {...props} color="black" icon="delete" />
            )}
            description="Tap here to clear all the values."
          />
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};
