import { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";
import { addRecipe } from "../database";
import { useRouter } from "expo-router";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const save = async () => {
    if (!name.trim()) return Alert.alert("Completează numele rețetei");
    try {
      await addRecipe({ name, ingredients, instructions, image });
      Alert.alert("OK", "Rețetă salvată");
      setName(""); setIngredients(""); setInstructions(""); setImage("");
      router.push("/myrecipes");
    } catch (err) {
      console.log(err);
      Alert.alert("Eroare la salvare");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.input} placeholder="Nume rețetă" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Ingrediente (separate prin virgulă)" value={ingredients} onChangeText={setIngredients} multiline />
      <TextInput style={styles.input} placeholder="Instrucțiuni" value={instructions} onChangeText={setInstructions} multiline />
      <TextInput style={styles.input} placeholder="URL imagine (opțional)" value={image} onChangeText={setImage} />
      <Button title="Salvează rețeta" onPress={save} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: "#fff" }
});
