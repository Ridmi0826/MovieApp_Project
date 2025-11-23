import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseconfig";



export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState<string>("User");
  const [email, setEmail] = useState<string>("user@example.com");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setEmail(currentUser.email || "user@example.com");
        
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || "User");
        }
      } else {
        router.replace("../login/Login"); // If not logged in, redirect to login
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.replace("../login/Login");
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        style={styles.avatar}
      /> */}
      <Image source={require("../../assets/images/profile.png")} style={styles.avatar} />

      
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.infoBox}>
        <Ionicons name="film" size={20} color="#38bdf8" />
        <Text style={styles.infoText}>Total Watched: 42</Text>
      </View>
      <View style={styles.infoBox}>
        <Ionicons name="heart" size={20} color="#ef4444" />
        <Text style={styles.infoText}>Favorites: 10</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    paddingTop: 80,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    color: "#94a3b8",
    marginBottom: 30,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#455c83ff",
    padding: 12,
    borderRadius: 12,
    width: "80%",
    marginBottom: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#455c83ff",
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
