
import  { AsyncStorage } from 'react-native';

 class TestAsyncStorage{

  async saveData(key,value)
  {
    try {
      await AsyncStorage.setItem(key,JSON.stringify(value));
    } catch (error) {
     
    }
  }

  async getData(key)
  {
    try {
    const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
    }
  }

  async clear()
  {
    try {
    const value = await AsyncStorage.clear();
      return value;    
    } catch (error) {
    }
  }

  async removeItem(key){
    try {
      const value =  await AsyncStorage.removeItem(key)
      return value
    } catch (error){
        alert(error)
    }
  }

}

const testAsyncStorage=new TestAsyncStorage()
export  default testAsyncStorage