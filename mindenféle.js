    saveData() {
    const {title, text} = this.state;
    let myArray = {title: title, text: text}
    AsyncStorage.setItem('myArray', JSON.stringify(myArray));
    Keyboard.dismiss();
  }



  showData () {
    let myArray = AsyncStorage.getItem('myArray');
    var valueJSON = JSON.parse(myArray)
    this.setState({title: valueJSON.title, text: valueJSON.text}
  }


    storeData = async () => {
    try {
      const {title, text} = this.state;
      let myArray = {title: title, text: text}
      await AsyncStorage.setItem('myArray', JSON.stringify(myArray))
      Keyboard.dismiss();
    } catch {
      // saving error
    }
  }
  
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('myArray')
      if(value !== null) {
        var valueJSON = JSON.parse(myArray)
        this.setState({title: valueJSON.title, text: valueJSON.text}
      }
    } catch {
      // error reading value
    }
  }


  const dataToBeSaved = {‘title’ : this.state.title , ‘text’ : this.state.text}



  constructor(props) {
      super(props);
      this.state ={title:'', text: ''};
  }

  const dataToBeSaved = {‘title’ : this.state.title , ‘text’ : this.state.text}

  const existingData = await AsyncStorage.getItem(‘data’)

let newData = JSON.parse(existingData);
if( !newData ){
 newData = []
 }

newData.push( dataToBeSaved )

await AsyncStorage.setItem(‘data’, JSON.stringify(newData) )
 .then( ()=>{
 console.log(‘It was saved successfully’)
 } )
 .catch( ()=>{
 console.log(‘There was an error saving the product’)
 } )

  render(){
    return (
      <Card>
        <CardItem>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>Title</Text>
            <TextInput
              autoCorrect={false}
              style={styles.inputStyle}
              value={this.state.title}
              onChangeText={title=>this.setState({title})}
            />
          </View>
        </CardItem>
        <CardItem>
          <TextInput 
            style={{flex:1}}
            multiline={true}
            value={this.state.text}
            onChangeText={text=>this.setState({text})}
          />
        </CardItem>
        <CardItem>
          <Button
            onPress={()=>this.storeData()}
          >Create</Button>
        </CardItem>
        <CardItem>
          <Button
            onPress={()=>this.getData()}
          >Show</Button>
        </CardItem>         
      </Card>
    )
  }
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 8,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 2,
  },
  containerStyle: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
};


export default ListCreate;






  getData(){
    const existingData = await AsyncStorage.getItem(‘data’)
  }

  saveData(){
    let newData = JSON.parse(existingData);
    if( !newData ){
     newData = []
     newData.push( dataToBeSaved )
     }
  }

  editData(){
    await AsyncStorage.setItem(‘data’, JSON.stringify(newData) )
     .then( ()=>{
     console.log(‘It was saved successfully’)
     } )
     .catch( ()=>{
     console.log(‘There was an error saving the product’)
     } )
  }