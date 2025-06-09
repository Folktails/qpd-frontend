import * as stylex from '@stylexjs/stylex';
import { useGetBannerList } from '../hooks/useGetBannerList';
import { config } from '~/config';
import { HorizontalDrag } from '~/shared/components/ui/drag/horizontal-drag';

export const Banner = () => {
	const { data } = useGetBannerList();

	if (!data?.bannerList.length) return <></>;

	return (
		<HorizontalDrag isMounted>
			<img
				{...stylex.props(styles.base)}
				src={config.image.host + data?.bannerList[0]?.imageId}
			/>
		</HorizontalDrag>
	);
};

const styles = stylex.create({
	base: {
		display: 'flex',
		flexShrink: 0,

		width: '100%',
		height: 114,
		borderRadius: 14,
		zIndex: 999,
		position: 'relative',
		top: '0',
	},
});
