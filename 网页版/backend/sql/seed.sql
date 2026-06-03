USE luying;

INSERT INTO user (email, password_hash, name, role) VALUES
('admin@luying.local', 'mock-hash', '露之营管理员', 'ADMIN'),
('lin@luying.local', 'mock-hash', '林周末', 'USER'),
('xu@luying.local', 'mock-hash', '许小露', 'USER');

INSERT INTO camp (
  slug, name, province, city, district, address, latitude, longitude,
  map_region_key, map_x, map_y, camp_type, cover_image, gallery_json,
  price_type, price_min, price_max, booking_required, opening_status,
  source_type, best_season, arrival_tips, risk_tips, suitable_for_json, rules_json, summary
) VALUES
('hangzhou-lake-breeze', '湖风松坡营地', '浙江省', '杭州', '临安区', '临安区天目山脚下湖风松坡营地',
30.255000, 119.710000, 'hangzhou', 24, 32, '湖边营地', '/camp/camp-1.jpg', JSON_ARRAY('/camp/camp-1.jpg', '/camp/camp-2.jpg'),
'收费营地', 198, 398, 1, 'OPEN', 'EDITORIAL', '春秋最佳', '导航到游客中心后继续前行 800 米',
'雨后土路稍滑，夜间温差较大', JSON_ARRAY('新手家庭', '周末轻露营'), JSON_ARRAY('22:30 后控制音量', '明火需在指定区域'), '湖边视野开阔，设施齐整，适合第一次带家人出发'),
('hangzhou-forest-dawn', '林涧晨雾营地', '浙江省', '杭州', '余杭区', '余杭区山谷林涧晨雾营地',
30.300000, 119.960000, 'hangzhou', 34, 28, '森林营地', '/camp/camp-4.jpg', JSON_ARRAY('/camp/camp-4.jpg', '/camp/camp-1.jpg'),
'收费营地', 158, 268, 0, 'OPEN', 'USER', '夏秋', '建议 SUV 或底盘稍高车型前往', '连续降雨后道路泥泞',
JSON_ARRAY('新手', '宠物友好'), JSON_ARRAY('明火仅限公共区域'), '更偏自然体验，适合想拍晨雾和树影的新手'),
('suzhou-lake-pier', '太湖栈桥营地', '江苏省', '苏州', '吴中区', '吴中区太湖边栈桥营地',
31.160000, 120.370000, 'suzhou', 43, 54, '湖边营地', '/camp/camp-2.jpg', JSON_ARRAY('/camp/camp-2.jpg', '/camp/camp-5.jpg'),
'收费营地', 168, 298, 1, 'OPEN', 'OFFICIAL', '春秋最佳', '西门进更近', '节假日停车等待时间长',
JSON_ARRAY('亲子', '拍照'), JSON_ARRAY('晚 10 点后不可外放音响'), '城市周边最省心的湖边营地之一'),
('suzhou-meadow-sunset', '苏南草甸日落点', '江苏省', '苏州', '昆山市', '昆山市近郊草甸营位',
31.420000, 120.940000, 'suzhou', 51, 48, '草地营地', '/camp/camp-5.jpg', JSON_ARRAY('/camp/camp-5.jpg', '/camp/camp-2.jpg'),
'收费营地', 129, 229, 0, 'OPEN', 'EDITORIAL', '春秋', '停车场到营位步行约 80 米', '周末下午风较大，建议加固天幕',
JSON_ARRAY('亲子', '天幕轻露营'), JSON_ARRAY('离开前需自行打包垃圾'), '草地平整，适合轻量装备和短途周末出发'),
('chengdu-cloud-lake', '云湖牧歌营地', '四川省', '成都', '邛崃市', '邛崃市云湖牧歌营地',
30.380000, 103.380000, 'chengdu', 68, 46, '湖边营地', '/camp/camp-3.jpg', JSON_ARRAY('/camp/camp-3.jpg', '/camp/camp-6.jpg'),
'收费营地', 168, 328, 1, 'OPEN', 'OFFICIAL', '春秋', '节假日建议中午前到', '午后紫外线较强',
JSON_ARRAY('亲子', '新手'), JSON_ARRAY('烧烤区域需按营地引导使用'), '景观和设施平衡得很好'),
('chengdu-river-moon', '月河台地营位', '四川省', '成都', '彭州市', '彭州市河谷边月河台地营位',
30.990000, 103.930000, 'chengdu', 74, 39, '河畔营地', '/camp/camp-6.jpg', JSON_ARRAY('/camp/camp-6.jpg', '/camp/camp-3.jpg'),
'收费营地', 99, 188, 0, 'OPEN', 'USER', '秋季最佳', '导航到停车点后步行 50 米', '雨季河道水位上涨较快，需看天气',
JSON_ARRAY('新手', '朋友聚会'), JSON_ARRAY('禁止靠近河道边缘扎营'), '价格友好，适合第一次试轻过夜');

INSERT INTO camp_facility (
  camp_id, has_toilet, has_shower, has_power, has_water, allow_fire, can_overnight,
  pet_friendly, family_friendly, car_accessible, signal_strength, road_condition, parking_distance
) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '4G 稳定', '全程铺装路，最后 300 米缓坡', '车可停到营位旁 20 米'),
(2, 1, 0, 0, 1, 0, 1, 1, 0, 0, '4G 一般', '连续雨天后需谨慎', '停车后步行 60 米'),
(3, 1, 1, 1, 1, 0, 1, 1, 1, 1, '5G 稳定', '导航直达', '步行 20 米'),
(4, 1, 0, 1, 1, 1, 1, 0, 1, 1, '4G 稳定', '最后一段乡道较窄', '步行 80 米'),
(5, 1, 1, 1, 1, 1, 1, 1, 1, 1, '全网稳定', '高速转县道，整体轻松', '车位 20 米'),
(6, 1, 0, 0, 1, 0, 1, 1, 0, 0, '4G 良好', '停车点后为平整土路', '步行 50 米');

INSERT INTO guide (slug, title, summary, cover_image, category, city_scope, content, status, published_at) VALUES
('hangzhou-first-camp', '杭州周边第一次露营怎么选营地', '围绕营地筛选、设施判断和新手决策展开。', '/camp/camp-1.jpg', '新手指南', '杭州', '先看是否可过夜，再看卫生与交通，再看真实评论。', 'PUBLISHED', NOW()),
('hangzhou-family-weekend', '杭州周边带孩子周末露营怎么选', '重点关注卫生、路况和洗漱条件。', '/camp/camp-4.jpg', '亲子攻略', '杭州', '先锁定有卫生间和车可达的营地，再看夜间规则。', 'PUBLISHED', NOW()),
('suzhou-family-camp', '苏州亲子露营营地避坑清单', '适合家庭周末出发前快速查阅。', '/camp/camp-2.jpg', '新手指南', '苏州', '优先选择有卫生间、车可达、规则清晰的营地。', 'PUBLISHED', NOW()),
('suzhou-light-camp', '苏州轻露营装备尽量少带这几样', '适合城市周边快闪露营。', '/camp/camp-5.jpg', '装备建议', '苏州', '先带刚需，再按天气和路况增补。', 'PUBLISHED', NOW()),
('chengdu-newbie-overnight', '成都第一次过夜露营先看这 5 条', '从新手视角缩短试错路径。', '/camp/camp-3.jpg', '新手指南', '成都', '第一次过夜尽量避开风大高海拔营地。', 'PUBLISHED', NOW()),
('chengdu-river-safety', '成都河边露营先看水位和风向', '更适合对河畔营地感兴趣的新手。', '/camp/camp-6.jpg', '风险提示', '成都', '河边露营优先看天气和水位预警，扎营位置要远离边坡。', 'PUBLISHED', NOW());

INSERT INTO review (camp_id, user_id, overall_score, scene_score, clean_score, quiet_score, access_score, newbie_score, family_score, cost_score, content, visit_date, helpful_count, status) VALUES
(1, 2, 5, 5, 4, 4, 5, 5, 5, 4, '第一次带家人去，卫生和路况都比预期稳。', '2026-04-12', 2, 'APPROVED'),
(1, 3, 4, 5, 4, 4, 4, 5, 4, 4, '湖景很好，夜间比较安静，适合第一次轻露营。', '2026-05-01', 1, 'APPROVED'),
(2, 2, 4, 4, 3, 4, 3, 4, 3, 4, '晨雾很漂亮，但雨后路确实会有点泥。', '2026-05-14', 0, 'APPROVED'),
(3, 3, 4, 5, 4, 3, 5, 4, 5, 4, '节假日人流会多，但营地秩序整体还可以。', '2026-04-20', 1, 'APPROVED'),
(4, 2, 5, 5, 4, 4, 4, 4, 5, 4, '带孩子去很轻松，洗漱和停车都方便。', '2026-04-28', 2, 'APPROVED'),
(5, 2, 5, 5, 4, 4, 4, 5, 4, 4, '景观和设施平衡得很好，适合第一次过夜。', '2026-05-03', 3, 'APPROVED'),
(6, 3, 4, 4, 3, 5, 3, 4, 3, 5, '价格友好，朋友一起去性价比很高。', '2026-05-22', 1, 'APPROVED');
