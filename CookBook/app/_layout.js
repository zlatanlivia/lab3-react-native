import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#FF7043" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Cook Book" }} />
      <Stack.Screen name="recipe/[id]" options={{ title: "Detalii Rețetă" }} />
      <Stack.Screen name="myrecipes/index" options={{ title: "Rețetele Mele" }} />
      <Stack.Screen name="addrecipe" options={{ title: "Adaugă Rețetă" }} />
    </Stack>
  );
}
