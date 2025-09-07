import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from "react-native";

type MusicProps = {
  imageUrl: string;
  name: string;
  singerName: string;
  songYear: string;
  isSoldOut :boolean;
  onPress?: () => void;
};

export const MusicCard = (props: MusicProps) => {
  return (
    <TouchableOpacity style={styles.cardMain} onPress={props.onPress} activeOpacity={0.7}>
      <Image style={styles.image} source={{ uri: props.imageUrl }} />
      <View style={styles.cardBody}>
        <Text style={styles.textSongText}>{props.name}</Text>
        <View style={styles.cardBody2}>
          <Text style={styles.textSingerNameText}>{props.singerName}</Text>
          <Text style={styles.textSongYear}>{props.songYear}</Text>
        </View>
      </View>
      <View style={styles.cardEnd}>
        {props.isSoldOut  && <Text style={styles.textIsAvaible}>Tükendi</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardMain: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7ff",
    padding: 5,
    marginBottom:2
  },
  cardBody: {
    marginLeft: 10,
    justifyContent: "center",
    width:Dimensions.get('window').width/2.5
  },
  cardBody2: {
    flexDirection: "row",
    alignItems:'center'
  },
  cardEnd:{
    flex:1,
    flexDirection:"row-reverse",
    alignItems:'center'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  textSongText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textSingerNameText: {
    fontSize: 14,
  },
  textSongYear: {
    color:'gray',
    marginLeft:5,
    fontSize:10,
    padding:1,
    borderRadius:6
  },
  textIsAvaible:{
    padding:2,
    borderWidth:2,
    borderColor:'red',
    fontWeight:'bold',
    color:'red',
    borderRadius:5,
    marginEnd:5
  }
});
