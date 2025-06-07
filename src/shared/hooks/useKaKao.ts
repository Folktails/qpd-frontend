export const useKaKao = () => {
	const { Kakao } = window;

	const kakaoLogin = () => {
		Kakao.Auth.authorize({
			redirectUri: 'https://api.questionperday.me/user/auth/kakao',
			state: 'login',
		});
	};

	// const logout = () => {
	// 	auth.logout();
	// };

	// const shareLink = (url: string, text: string) => {
	// 	share.sendDefault({
	// 		objectType: 'feed',
	// 		content: {
	// 			title: '오늘의 질문',
	// 			description: text,
	// 			imageUrl: 'https://example.com/image.png',
	// 			link: {
	// 				mobileWebUrl: url,
	// 				webUrl: url,
	// 			},
	// 		},
	// 		buttons: [
	// 			{
	// 				title: '답변하기',
	// 				link: {
	// 					mobileWebUrl: url,
	// 					webUrl: url,
	// 				},
	// 			},
	// 		],
	// 	});
	// };

	return { kakaoLogin };
};
