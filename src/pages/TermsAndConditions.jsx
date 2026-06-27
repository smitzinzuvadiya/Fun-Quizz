import { Link } from 'react-router-dom';
import { CoinBadge } from '../components/CoinBadge';
import quizLogo from '../assets/quiz3.png';

export function TermsAndConditions() {
  return (
    <div className="pt-[68px] animate-in fade-in duration-500 flex flex-col h-full bg-[#7A61FE] overflow-x-hidden relative">
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#7A61FE] flex justify-between items-center px-[20px] py-4 shadow-md">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={quizLogo} alt="PlayQuiz" className="h-10 object-contain rounded-xl" />
          </Link>
        </div>
        <CoinBadge />
      </header>

      <main className="flex-1 px-[20px] pt-8 pb-6 overflow-y-auto">
        <div className="bg-white rounded-[32px] px-6 py-8 text-[#111827] relative shadow-xl">
          {/* Top Notch Decor matching image */}
          <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-14 h-6 bg-white rounded-t-[20px] flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5b3eb8] mt-2"></div>
          </div>

          <h2 className="font-extrabold text-[22px] leading-tight tracking-tight text-black mb-5">
            TERMS AND CONDITIONS Last modified: 1 Feb, 2025
          </h2>

          <div className="text-[16px] font-medium leading-snug space-y-6">
            <p>The Terms of Use includes a concise contract between you (the User) and thopquiz. By using the services of our company, you agree to comply with all terms and conditions outlined herein. Your acceptance of these terms and conditions will be understood as automatically and will remain in effect for the duration of your service. You are advised to read our terms of Use carefully to avoid any future misunderstandings.</p>

            <p>You would be liable to accept our Terms of Use automatically in case if you opt for registering on thopquiz from another Publisher service/product/website and opt for them. It is highly recommended for you to check out them attentively before making the use of any of our product/service. Apart from this, make sure to avoid making changes or copying in any part of our product/service or trademarks by any means.</p>

            <p>Our source code is personal and confidential, so make sure to avoid extracting the product/service's code and translating the product/service into other languages or creating the derivative versions. The owner of quiz has all the rights related to product/service and also own all the database rights, copyright, the trademarks, and other intellectual property rights related to it. In addition to this, these terms of use are liable to be changed with the time, so we request our users to keep checking out them at a regular interval.</p>

            <p>Once the users register our website successfully, the services are ready to use. However, there are a few important points which you must be pondering upon before using the services such as:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>You must check out the instructions carefully and understand them before using the product.</li>
              <li>Avoid copying the content or making any changes to the product.</li>
              <li>It is strictly prohibited to make any changes to the trademark of the company.</li>
              <li>The source code extraction is not allowed at any cost.</li>
              <li>The information should not be attempted to translate in any other languages. It should be original as such.</li>
              <li>thopquiz are the sole owners of any information related to product such as trademarks, copyright, database rights and other property rights.</li>
              <li>The mentioned terms of use are subject to change anytime and many times hence you must check and read it frequently.</li>
              <li>According to the provisions of the Information Technology Act 2000 and the Information Technology (intermediaries guidelines) Rules 2011, these terms can be amended from time to time.</li>
              <li>This website is only for people who are above 18 years of age, minors who fall under 18 category are restricted from using this website.</li>
              <li>The company has the full rights to change the product or its services for any reason in future. But, the users will not be charged of any service fee and registration fees. Under no circumstances the company will ask it users for any personal details regarding money transfer. Protect yourselves from fraud schemes and activities in future.</li>
              <li>Any payment made through third party towards thopquiz is unauthorised and we will not be responsible for that particular transaction.</li>
              <li>The only information asked from the user is during the login session; apart from that thopquiz will never even share your details with third party. The basic information is kept in the database for smooth functioning of the services.</li>
              <li>For you, using the product without any intervention, there is a requirement for a good internet connection, it can be through wifi or mobile data. thopquiz will not be responsible if the product is disturbed due to internet connectivity.</li>
              <li>For enjoying an uninterrupted service from thopquiz, we suggest you to check your internet connection before logging into the website.</li>
              <li>If you are planning to use the product on mobile data service, then you must be aware by the terms of mutual agreement with your mobile operator for extra charges during the usage. By this you will automatically agree to the extra fee towards the mobile operator company. This is also applicable for the roaming services in case you are out of your location.</li>
              <li>You are advisable to keep paying your bill on time to avoid any disruption while using the product. In case of non payment of bill at least take permission from the service provider.</li>
              <li>thopquiz will not have any responsibility for the way you use the product. You must ensure the smart phone is fully charged and is not out of battery while using the service. It is your choice how and when you would use the product.</li>
            </ul>

            <p>thopquiz does not depend on third party for providing our users with the useful information related to the product/service. We will by default keep the changes updating time to time and suggest our users to read them out quite often. thopquiz will not depend on any experience related to direct or indirect loss and will function fully in order to keep the product running smoothly.</p>

            <p>There are several circumstances under which third party products and ads are being enabled on our website. We are not responsible for such ads and such kind of activities as the third party is responsible for the same. The ads showed on our website will be the property of the third party merchants, hence we suggest our users to read and understand before making any such decision.</p>

            <p>thopquiz is not in alignment with the ads content in any way, they are not controlled or affiliated to us. Hence, any action related to ads and networking will not be related to thopquiz.</p>

            <p>If you decide to submit your personal information through the ads posted on our website, then your information will be subjected to be used as per the third party privacy policy and is in no way in coordination with the policy which is mentioned under thopquiz. There is another imperative notice from thopquiz that at any point of time the services can be suspended or terminated without giving prior information to the user. Under these circumstances the following changes will be made by default:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>The licenses provided to the user will be withheld</li>
              <li>The user will not be permitted to use the product</li>
              <li>Product deletion will be necessary from the user's end.</li>
            </ul>

            <p>There are different types of contests which will be available on thopquiz for all its users and one must follow the certain important rules to be a part of this fair and fun quiz which is discussed below:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Each quiz has a fixed time frame which allows users to be participated in that provided time period with a Start time and End time.</li>
              <li>All the necessary details like the name of the quiz, start time, end time and rank metric will be clearly highlighted on the contest which is active.</li>
              <li>The most imperative note to be made by the user is no contest or quiz played on thopquiz will have money as a reward, all the quizzes or contests have coins as their rewards.</li>
              <li>These coins are completely free for those involved in the quiz contests and the website will also provide you some extra coins if there are fewer coins in your wallet.</li>
              <li>These coins can also be won through other coins based games.</li>
              <li>Please be clear on the point that the coins provided in this game are solely for the purpose of gaming and cannot be converted to real money at any point of time. These are only for coin based contests.</li>
              <li>The winner will be rewarded with coins and no other option, finally.</li>
              <li>When users participate in any contest, they must be informed that there are thousands of other participants who are already playing the game and their (users) Rank will depend on the overall score of all the participants.</li>
              <li>thopquiz website will never ask to deposit money in any way to participate in these contest.</li>
              <li>The contests on this website thopquiz.com are absolutely free of cost and don't require any registration fee. There are no in product purchases hence the user must be careful before making any such commitments.</li>
            </ul>

            <h3 className="font-extrabold text-[18px] text-black mt-8 mb-3">Procedure For Coins Distribution:</h3>
            <p>At the end of any contest played on thopquiz, the winners will be announced and the prize will be given in the form of coins.</p>

            <p>Remember, users are advised to check all the details like Rank Metric and participation rules for joining the next quiz.</p>

            <p>The coins won by the user will remain in his or her wallet unless he or she wants to use the coins for other coin based contest. At no point the collected coins can be converted into real prize money.</p>

            <p>If the company notices some uncommon behaviour or abusive activity during the contest playing time, or winning, they have full authority to take appropriate actions such as blocking the user permanently.</p>

            <p>Likewise, if any fraud activities like manipulating the game, interfering with the functions of fair contest are detected from the user's end then the company might also terminate the access of the product from that particular user without giving prior notice.</p>

            <p>Under no circumstances will the company (thopquiz.com), its officers, directors and employees can be held responsible to the user for anything which might bother you related to the website, be it a part of the contract or even otherwise. This also included anything which is a special liability arising out directly or indirectly associated with the user and the website.</p>

            <p>thopquiz.com cannot control nor have any duty to take any sort of action on how the user will use the content available on the website or even how the user will interpret with suitable actions which may or may not result of the user being exposed to the content through the services.</p>

            <p>The users must agree to defend, indemnify and even hold the company harmless along with its officers, directors, agents and employees from any type of claim, damage, obligations, cost of debt, expenses and liabilities which will be included, but cannot be limited to lawyer fee appearing from the following:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>User use and access of the website/product/services.</li>
              <li>Violation of any terms or policy of the thopquiz by the user.</li>
              <li>Any sort of violation of the third party right which includes without limitation, copyright, property or any privacy right made by the user.</li>
              <li>If there are sort of claims that the user using the website will cause damage to the third party. These defence and compensation will survive the mentioned terms and conditions.</li>
            </ul>

            <p>thopquiz.com is always under process of improving its services and conditions hence the terms and conditions are not always the same. When the user is using any services provided by the company, the user will be automatically is subjected to rules, guidelines, policies, terms and conditions applicable to such services and will be considered to be included into these terms of use and will be accepted as a part of these terms of use.</p>

            <p>We at thopquiz.com have the rights in any matter to change, add or even exclude some portions of these mentioned terms of use without any prior written notice to you. It is the responsibility of the user to read and review these terms of use regularly for keeping one self-updated.</p>

            <p>If the user is using the product continuously then it means by default that the user has accepted the changes and revisions when they are made by the website or company.</p>

            <p>If the user is not in coordination with any term or condition mentioned in the website, they are free to reject them with the consequence of not being able to use the product in future.</p>

            <p>Notwithstanding with any terms if the user decides to go ahead with the product then that means the user will agree to all the changes made by the company.</p>

            <p>This only applies to the changes mentioned here and no other modifications will be effective.</p>

            <p>In case of any provision of the above terms and conditions is found to be unenforceable or invalid under any law, then that shall not render the terms of use or invalid overall and such provisions will be deleted without making changes to the remaining provisions.</p>

            <p>The company has its own rights to assign and transfer its obligations and rights under these Terms without notifying or giving consent whatsoever.</p>

            <p>The mentioned Terms and Conditions which includes any legal notices and disclaimers of this website will automatically come in alignment with the agreement made between the user and the product.</p>

            <p>The Terms will be according to the permitted standards and in accordance to the laws of India while being firm on all the law principals.</p>

            <p>The terms and conditions shall be subjected to exclusive jurisdiction of the competent courts which are location in Gurugram, Haryana. The user will hereby accept the jurisdiction of such courts and orders.</p>

            <p>In addition to this, there is no kind of involvement of any partnership, agency, or a joint venture as mentioned in the Terms and the user doesn't have the right to add such third parties to the company in any way which may lead to termination of the services.</p>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6 mb-2">
          <Link to="/terms" className="text-white font-medium text-[15px] underline underline-offset-2 hover:text-white/80 transition-colors">Terms & Conditions</Link>
          <a href="#" onClick={e => e.preventDefault()} className="text-white font-medium text-[15px] underline underline-offset-2 hover:text-white/80 transition-colors">Privacy policy</a>
        </div>
      </main>
    </div>
  );
}
