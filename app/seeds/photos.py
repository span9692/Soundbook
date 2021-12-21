from app.models import db, Photo

def seed_photos():
    photo1 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639631811/ice%20cube%20nwa/download_aks9px.jpg', owner_id=1)
    photo2 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639631812/ice%20cube%20nwa/635798662187573581-NWA_vggzgr.jpg', owner_id=1)
    photo3 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639631812/ice%20cube%20nwa/998d2388-7754-4457-8faf-b7dcd640aeca_t6ejwk.jpg', owner_id=1)
    photo4 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639631812/ice%20cube%20nwa/1-ICE-CUBE_le7lsz.jpg', owner_id=1)
    photo5 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639631812/ice%20cube%20nwa/145931062_3e053b4af9_b_sbtbag.jpg', owner_id=1)
    photo6 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639631812/ice%20cube%20nwa/Ice-Cube-2015_blgqwc.jpg', owner_id=1)
    photo7 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639631813/ice%20cube%20nwa/IceCube_Toronto2006_nemd8h.jpg', owner_id=1)
    photo8 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639631812/ice%20cube%20nwa/la-1512109111-ew3xhywr3t-snap-image_g2zmkj.jpg', owner_id=1)
    photo9 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639632210/ice%20cube%20nwa/ows_143171219245947_vbqr2f.jpg', owner_id=1)
    photo10 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639632210/ice%20cube%20nwa/54d42bd51c625_-_esq-cube-de_xp0w74.jpg', owner_id=1)
    photo11 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639632448/dr%20dre%20nwa/drdre_gngmnv.jpg', owner_id=2)
    photo12 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639632449/dr%20dre%20nwa/dr-dre-tom-ford-fw-2020-billboard-1548_b6d8un.jpg', owner_id=2)
    photo13 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639632449/dr%20dre%20nwa/skynews-dr-dre-hospital-brain-aneurysm_5228641_zl40lz.jpg', owner_id=2)
    photo14 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639632448/dr%20dre%20nwa/140127075600_bnztbb.jpg', owner_id=2)
    photo15 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639632449/dr%20dre%20nwa/Dr-Dre-2003_ewppdv.jpg', owner_id=2)
    photo16 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1639632449/dr%20dre%20nwa/dr-dre-7-million-extravagant-purchases-ex-wife-1200x675_yvlrms.jpg', owner_id=2)
    photo17 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126351/ariana%20grande/ariana-grande-1584979249.426218.2560x1440_knjk5q.jpg', owner_id=4)
    photo18 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126352/ariana%20grande/screen-shot-2021-08-24-at-2-42-27-pm-1629831151_wlj3wx.png', owner_id=4)
    photo19 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126350/ariana%20grande/ARIANA-GRANDE-TO-GIVE-AWAY-1M-THE-VOICE-1_yq80gv.jpg', owner_id=4)
    photo20 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126349/ariana%20grande/10556868_cqdnjl.jpg', owner_id=4)
    photo21 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126350/ariana%20grande/ariana-grande_vi5byn.jpg', owner_id=4)
    photo22 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126349/ariana%20grande/ariana-grande_1_jf03nx.jpg', owner_id=4)
    photo23 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126349/ariana%20grande/American-singer-Ariana-Grande-2018_bn1cjl.jpg', owner_id=4)
    photo24 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126349/ariana%20grande/464099166_cdrckr.jpg', owner_id=4)
    photo25 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126349/ariana%20grande/112015-ariana-grande-21-2000_b7d3cn.jpg', owner_id=4)
    photo26 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126349/ariana%20grande/0518658ed0db6284ff13ab36cda819716a-19-ariana-grande.rvertical.w1200_lsms6u.jpg', owner_id=4)
    photo27 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640126348/ariana%20grande/66bca7cb33e04403979db9ac1d68edab_xl_yzthin.jpg', owner_id=4)
    photo28 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128208/lisa%20profile/unnamed_uwebdp.jpg', owner_id=5)
    photo29 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128208/lisa%20profile/wp5623995_iqrnww.jpg', owner_id=5)
    photo30 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128208/lisa%20profile/main-qimg-a96d5183e4a954ca7b7374a03f744d22_ekuoc1.jpg', owner_id=5)
    photo31 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128208/lisa%20profile/lisa-blackpink-2019-b-billboard-1548_sqrhba.jpg', owner_id=5)
    photo32 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128207/lisa%20profile/maxresdefault_k8rlrs.jpg', owner_id=5)
    photo33 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128208/lisa%20profile/lisa_blackpink_mac_campaign_szcwyu.jpg', owner_id=5)
    photo34 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128206/lisa%20profile/jpg_mkkntd.jpg', owner_id=5)
    photo35 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128206/lisa%20profile/https___hypebeast.com_wp-content_blogs.dir_6_files_2021_10_blackpink-lisa-mac-cosmetics-collaboration-makeup-announcement-release-4_fxl92x.jpg', owner_id=5)
    photo36 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128206/lisa%20profile/blackpink_20lisa_20gold_20background_o9cxcv.jpg', owner_id=5)
    photo37 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128206/lisa%20profile/4c45f9b4-30f3-11ea-9400-58350050ee52_image_hires_131226_m9gidr.jpg', owner_id=5)
    photo38 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128206/lisa%20profile/DZsjGWiW0AA44RH_nicq4u.jpg', owner_id=5)
    photo39 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640128206/lisa%20profile/backpink_lisa_gimpo_airport_0_bu5cba.jpg', owner_id=5)
    photo40 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130175/britney%20profile/britney-spears-sandwich-FT-BLOG0421_xq6qys.jpg', owner_id=6)
    photo41 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130174/britney%20profile/Press-shot-1-PC-Randee-St.-Nicolas_jbu2rz.jpg', owner_id=6)
    photo42 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130174/britney%20profile/d22de519-5d08-45f0-bc5e-dac6df9fd5d1-d_spears_mus_26_vwwzuh.jpg', owner_id=6)
    photo43 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130177/britney%20profile/210623-britney-spears-2x1-cs_j9bm4o.jpg', owner_id=6)
    photo44 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130174/britney%20profile/ETO_A04_Britney_Spears_092921_g4ek9s.jpg', owner_id=6)
    photo45 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130171/britney%20profile/11eb7c9df58e9c20af586a50e316c9cf6a-britney-spears_fqtskb.jpg', owner_id=6)
    photo46 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130171/britney%20profile/britney-spears-has-seemingly-addressed-framing-br-2-8768-1612916499-2_dblbig_tbwoxp.jpg', owner_id=6)
    photo47 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130171/britney%20profile/2616_b7eh2k.jpg', owner_id=6)
    photo48 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130171/britney%20profile/britney-spears-2000-grammy-awards-white-dress-copy_usil5r.jpg', owner_id=6)
    photo49 = Photo(photo='https://res.cloudinary.com/photofinder/image/upload/v1640130172/britney%20profile/britney-spears-dad-legal-fees_sqijpf.jpg', owner_id=6)
# photo50 = Photo(photo='', owner_id=7)


    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo7)
    db.session.add(photo8)
    db.session.add(photo9)
    db.session.add(photo10)
    db.session.add(photo11)
    db.session.add(photo12)
    db.session.add(photo13)
    db.session.add(photo14)
    db.session.add(photo15)
    db.session.add(photo16)
    db.session.add(photo17)
    db.session.add(photo18)
    db.session.add(photo19)
    db.session.add(photo20)
    db.session.add(photo21)
    db.session.add(photo22)
    db.session.add(photo23)
    db.session.add(photo24)
    db.session.add(photo25)
    db.session.add(photo26)
    db.session.add(photo27)
    db.session.add(photo28)
    db.session.add(photo29)
    db.session.add(photo30)
    db.session.add(photo31)
    db.session.add(photo32)
    db.session.add(photo33)
    db.session.add(photo34)
    db.session.add(photo35)
    db.session.add(photo36)
    db.session.add(photo37)
    db.session.add(photo38)
    db.session.add(photo39)
    db.session.add(photo40)
    db.session.add(photo41)
    db.session.add(photo42)
    db.session.add(photo43)
    db.session.add(photo44)
    db.session.add(photo45)
    db.session.add(photo46)
    db.session.add(photo47)
    db.session.add(photo48)
    db.session.add(photo49)
    # db.session.add(photo50)

    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
