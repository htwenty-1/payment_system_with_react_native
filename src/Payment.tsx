import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import IMP from "iamport-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

// 20220318-173821-
// const date = new Date();
// let random = Math.floor(Math.random() * 10 + 1);
// let uid = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}-${random}`
// const memberId = 'kakao_test_account'

// const data = {
//     pg: 'tosspay',
//     pay_method: 'card',
//     merchant_uid: `ORD-${uid}-${memberId}`,   // 사용자 아이디를 추가
//     name: '카카오 편수냄비',
//     amount: 15200,
//     buyer_email: 'kakao@kakao.com',
//     buyer_name: '카카오',
//     buyer_tel: '010-1234-5678',
//     buyer_addr: '대전광역시 서구 둔산로 100',
//     buyer_postcode: '12345',
//     app_scheme: 'example',
//     escrow: false,
// }

// const tossData = {
//     pg: 'tosspay',
//     pay_method: 'card',
//     merchant_uid: `ORD-${uid}-userId`,   // 사용자 아이디를 추가
//     name: '토스 양수냄비',
//     amount: 27800,
//     buyer_email: 'toss@toss.com',
//     buyer_name: '테스트',
//     buyer_tel: '010-2345-6789',
//     buyer_addr: '대전광역시 중구 중앙로 100',
//     buyer_postcode: '67890',
//     app_scheme: 'example'
// }


const Loading = (props:any) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: "#000"}}>잠시만 기다려 주세요...</Text>
        </View>
    )
}

export default function Payment({ navigation }:any) {

    const [paymentInform, setPaymentInform] = useState({
        pg: '',
        pay_method: '',
        merchant_uid: '',
        name: '',
        amount: 0,
        buyer_email: '',
        buyer_name: '',
        buyer_tel: '',
        buyer_addr: '',
        buyer_postcode: '',
        app_scheme: '',
        escrow: false
    });

    const getPaymentInform = async () => {
        let payInform = await AsyncStorage.getItem('payment');
        try {
            if (payInform !== null) {
                setPaymentInform(JSON.parse(payInform));
                AsyncStorage.removeItem('payment'); // 결제 하지 않고 뒤로 돌아갈 때 메모리 누수 방지
            }
        } catch (err) {
            console.log(err);
        }
    }

    getPaymentInform();

    // useEffect(() => {
    //     let payInform = AsyncStorage.getItem('payment');
    //     try {
    //         if (payInform !== null) {
    //             setPaymentInform(payInform);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, []);

    const callBack = (resp:any) => {
        // console.log(resp);
        if (resp.imp_success === 'true') {
            navigation.replace('paymentResult', resp);
        } else {
            navigation.replace('paymentFailed', resp);
        }
    }

    return (
        <>
            {/* <Text>{data.pg}로 결제 테스트하기</Text> */}
            <IMP.Payment 
                userCode={'imp86589899'} 
                data={paymentInform} 
                loading={<Loading />}
                callback={callBack}
            />
        </>
    )
    
    
}