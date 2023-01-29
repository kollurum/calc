
import React, { useEffect } from 'react'
import { Alert ,Text, TextInput, View, StyleSheet, Button, SafeAreaView, Input} from 'react-native'


const CalculatorScreeen = () => {

    {/* first latitude1 and setLatitude points*/}
    const [latitude1, setLatitude1] = React.useState('')
    const [longitude1, setLongitude1] = React.useState('')

    {/* first latitude1 and setLatitude points*/}
    const [latitude2, setLatitude2] = React.useState('')
    const [longitude2, setLongitude2] = React.useState('')

    {/* it calculates distance and bearing */}   
    const [distance, setDistance] = React.useState('')
    const [bearing, setBearing] = React.useState('')

    {/* these states will reset the screen and values and also handling the error */} 
    const [reset, setReset]=React.useState(true)
    const [error, setError] = React.useState('')

    function handleError(){
        if(!latitude1 ||!longitude1 || !latitude2 || !longitude2){			
            setError("Input fields are required...")
			setDistance('')
            setBearing('')
			
            return;
        }
        setError('')
		computeDistance(latitude1,longitude1,latitude2,longitude2)
        computeBearing(latitude1,longitude1,latitude2,longitude2)
        
    }
    useEffect(()=>{
        if(reset){
            setDistance('')
            setBearing('')
            setLatitude1('')
            setLatitude2('')
            setLongitude1('')
            setLongitude2('')
            handleError()
            setError('')
            
        }
    },[reset])

    function resetScreen(){
        setReset(!reset)
    }

    function toRadians(degrees){
        return (degrees*Math.PI)/180
    }

    function toDegrees(radians){
        return (radians*180)/Math.PI
    }

    function round(value,decimals){
        return Number(Math.round(value+"e"+decimals)+"e-"+decimals)
    }

    function computeDistance(latitude1,longitude1,latitude2,longitude2){
        var R=6371 //km    
        var dLat = toRadians(latitude2-latitude1)
        var dLon = toRadians(longitude2-longitude1)
        var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos((latitude2*Math.PI)/180)*Math.cos((latitude1*Math.PI)/180)*Math.sin(dLon/2)*Math.sin(dLon/2)
        var c= 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
        var d=R*c
        const tr=`${round(d,3)}`
        setDistance('Distance: '+tr+' km')
    }
    function computeBearing(latitude1, longitude1, latitude2, longitude2){
        latitude1=toRadians(latitude1) 
        longitude1=toRadians(longitude1) 
        latitude2=toRadians(latitude2) 
        longitude2=toRadians(longitude2) 
        var y = Math.sin(longitude2 - longitude1) * Math.cos(latitude2)
        var x = Math.cos(latitude1) * Math.sin(latitude2) -Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(longitude2 - longitude1)
        var brng=`${round((toDegrees(Math.atan2(y,x)) +360)%360,3)}`
        setBearing('Bearing: '+brng+' degrees')
    }

    return (
        <SafeAreaView>
            <View style = {styles.container}>
            
                <TextInput
                    placeholder='enter latitude for point 1'
                    style={styles.input}
                    value={latitude1}
					onChangeText={Number=>setLatitude1(Number)}
                    keyboardType="numeric"
                />
                <Text style={{color:'red'}}>{error}</Text>
                <TextInput 
                    placeholder='enter longitude for point 1'
                    style={styles.input}
                    onChangeText={Number=>setLongitude1(Number)}
                    value={longitude1}
                    keyboardType="numeric"
                />
                <Text style={{color:'red'}}>{error}</Text>
                <TextInput 
                    placeholder='enter latitude for point 2'
                    style={styles.input}
                    onChangeText={Number=>setLatitude2(Number)}
                    value={latitude2}
                    keyboardType="numeric"
                />
                <Text style={{color:'red'}}>{error}</Text>
                <TextInput 
                    placeholder='enter longitude for point 2'
                    style={styles.input}
                    onChangeText={Number=>setLongitude2(Number)}
                    value={longitude2}
                    keyboardType="numeric"
                />
                <Text style={{color:'red'}}>{error}</Text>
                <Button title="Calculate" 
                    onPress={()=>{
						handleError()
										
                    }
					}
                />
                
                <Text></Text>
                <Button title="Clear" onPress={resetScreen}/>

                <Text></Text>
                <Text>{ distance }</Text>
                <Text>{ bearing } </Text>
            </View>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 30
       
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth:1,
        padding: 10,
    },
 })

export default CalculatorScreeen;