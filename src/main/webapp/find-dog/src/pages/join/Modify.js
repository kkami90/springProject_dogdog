import React, { useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';


const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

let pMessage = "";


const validateMessages = {
	required: '${label} is required!',
	types: {
		password: '${label} is not validate password!',
		email: '${label} is not validate email!'
	},
};


const Modify = (props) => {

	const [user, setUser] = useState({
		username: "",
		password: "",
		place: "",
		email: "",
		phoneNumber: ""
	});

	const onFinish = (values) => {
		console.log(values);
	};
	
	function inputHandle(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
		console.log(user);
		Check();
	}

	function Check(){
		console.log("check 들어옴");
		if (user.password === user.repassword) {
				pMessage = "일치합니다";
				console.log(pMessage);
			} else if (user.password !== user.repassword) {
				pMessage = "불일치";
				console.log(pMessage);
			}
	}
	let userId = props.match.params.id;
	//로그인된 정보 가져오기
	useEffect(() => {
		console.log("userEffect 들어옴");
		fetch("http://localhost:8000/user/" +userId , {
			method: "GET",
			headers: {
				"Authorization": localStorage.getItem("Authorization")
			}
		})
		.then(res => {
			res.json()
		})
		.then(res => {
			console.log("회원정보:"+res);
			setUser(res);
		});
	}, []);


	//수정된거 던지기
	function join(e) {
		e.preventDefault();

		fetch("http://localhost:8000/joinProc", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.text())
			.then((res) => {
				console.log("22", res);
				if (res === "ok") {
					alert("수정 성공");
					props.history.push("/login");
				} else {
					alert("수정 실패");
				}
			});
	}

	return (
		<div>
			<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
				<Form.Item
					name="username"
					label="이름"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input type="text"
						name="username"
						onChange={inputHandle}
						value={user.username} placeholder="이름 입력" />
				</Form.Item>
				<Form.Item
					name={['user', 'password']}
					label="비밀번호"

				>
					<Input type="password"
						name="password"
						onChange={inputHandle}
						value={user.password} placeholder="비밀번호 입력" />
				</Form.Item>

				<Form.Item
					name={['user', 'repassword']}
					label="비밀번호 확인"

				>
					<Input type="password"
						name="repassword"
						onChange={inputHandle}
						value={user.repassword} placeholder="비밀번호 재입력" />
				</Form.Item>
				<text>{pMessage}</text>




				<Form.Item
					name={['user', 'phoneNumber']}
					label="폰번호"
				>
					<Input type="text"
						name="phoneNumber"
						onChange={inputHandle}
						value={user.phoneNumber} placeholder="폰번호 입력" />
				</Form.Item>

				<Form.Item label="지역" type="text">
					<select type="text" name="place" onChange={inputHandle}>
						<option name="place" value="진구">진구</option>
						<option name="place" value="남구">남구</option>
						<option name="place" value="남구">강서구</option>
						<option name="place" value="남구">해운대구</option>
						<option name="place" value="남구">서구</option>
						<option name="place" value="남구">북구</option>
						<option name="place" value="남구">수영구</option>
						<option name="place" value="남구">동래구</option>
						<option name="place" value="남구">금정구</option>
					</select>
				</Form.Item>

				<Form.Item
					name={['user', 'email']}
					label="이메일"
				>
					<Input type="email"
						name="email"
						onChange={inputHandle}
						value={user.email}
						placeholder="메일 입력" />
				</Form.Item>

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Button type="primary" htmlType="submit" onClick={join}>
						가입하기
        </Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Modify;